import request from "supertest";
import app from "../app";
import { User } from "../models";
import { connectMongoose, disconnectMongoose } from "../testUtils/mongoose";

describe("User Tests", () => {
  let testUsers: typeof User[] = [];
  let netid: String = "vs399";

  beforeEach(async () => {
    await connectMongoose();
  });

  afterEach(async () => {
    await Promise.all(testUsers.map((user) => user.remove()));
    await disconnectMongoose();
  });

  describe("Get User", () => {
    it("should create user on get, with netid", async () => {
      // fetch user
      const res = await request(app).get(`/user?netid=${netid}`);
      expect(res.status).toEqual(200);
      expect(res.body.user.first_name).toEqual("Vincent");
    });
  });
});
