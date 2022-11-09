import request from "supertest";
import app from "../app";
import { connectMongoose, disconnectMongoose } from "../testUtils/mongoose";
import { Course } from "../models";
import { getCourses } from "../utils/coursetableCourses";

describe("Courses Tests", () => {
  let testCourses: typeof Course[] = [];

  beforeEach(async () => {
    await connectMongoose();
  });

  afterEach(async () => {
    await Promise.all(testCourses.map((course) => course.remove()));
    await disconnectMongoose();
  });

  describe("Get Courses", () => {
    it("should get all courses", async () => {
      // request all courses from coursetable api and convert to Courses
      let allCourses: typeof Course[] = getCourses();
      let n = allCourses.length;
      // fetch courses from db
      const res = await request(app).get("/course");
      expect(res.status).toEqual(200);
      // check all are there
      expect(res.body.courses).toHaveLength(n);
    });
  });
});
