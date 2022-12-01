import request from "supertest";
import app from "../app";
import { User } from "../models";
import { connectMongoose, disconnectMongoose } from "../testUtils/mongoose";

describe("User Tests", () => {
  let testNetid: String = "ghh9";

  beforeEach(async () => {
    await connectMongoose();
  });

  afterEach(async () => {
    let user = await User.findOne({ netid: testNetid });
    User.remove(user);
    await disconnectMongoose();
  });

  describe("Get User", () => {
    it("should fail to fetch user if no netid provided", async () => {
      const res = await request(app).get(`/user`);
      expect(res.status).toEqual(400);
    });

    it("should create user on get with netid, then next fetch shouldn't need to create one", async () => {
      // fetch user for the first time
      const res = await request(app).get(`/user?netid=${testNetid}`);
      expect(res.status).toEqual(200);
      expect(res.body.user.first_name).toEqual("Graham");

      // fetch user for the second time to get our cached version
      const res_cached = await request(app).get(`/user?netid=${testNetid}`);
      expect(res_cached.status).toEqual(200);
      expect(res_cached.body.user.first_name).toEqual("Graham");
    });
  });
});
