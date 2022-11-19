import request from "supertest";
import app from "../app";
import { User } from "../models";
import { connectMongoose, disconnectMongoose } from "../testUtils/mongoose";

describe("User Tests", () => {
  let testUsers: typeof User[] = [];
  let netid: String = "vs399";
  let valid_course_code: String = "CPSC 439";
  let invalid_course_code: String = "CPSC 666";

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

  describe("Edit User Schedule", () => {
    it("should add the valid course to their schedule", async () => {
      // fetch user
      const res = await request(app).post(
        `/user?netid=${netid}&course_code=${valid_course_code}`
      );
      expect(res.status).toEqual(201);
      expect(res.body.user.courses).toHaveLength(1);
    });

    it("should not add invalid course to their schedule", async () => {
      // fetch user
      const res = await request(app).post(
        `/user?netid=${netid}&course_code=${invalid_course_code}`
      );
      expect(res.status).toEqual(400);
    });

    it("should not add duplicate course to their schedule", async () => {
      // fetch user
      const res = await request(app).post(
        `/user?netid=${netid}&course_code=${valid_course_code}`
      );
      expect(res.status).toEqual(400);
    });

    it("should delete course from their schedule", async () => {
      // fetch user
      const res = await request(app).delete(
        `/user?netid=${netid}&course_code=${valid_course_code}`
      );
      expect(res.status).toEqual(201);
      // same length
      expect(res.body.user.courses).toHaveLength(0);
    });
  });
});
