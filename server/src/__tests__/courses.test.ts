import request from "supertest";
import app from "../app";
import { connectMongoose, disconnectMongoose } from "../testUtils/mongoose";
import { Course } from "../models";
import { getCourses } from "../utils/coursetableCourses";

describe("Courses Tests", () => {
  let testCourses: typeof Course[] = [];

  const testCourse = {
    title: "Software Engineering",
    course_code: "CPSC 439",
    schedule: "MW 1pm-2:15pm + 1",
    locations_summary: "WTS A51 - Watson Center 60 Sachem Street A51 + 1",
  };

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
      // check test course is there
      expect(
        res.body.courses.filter((c: any) => {
          return (
            c &&
            c.title == testCourse.title &&
            c.course_code == testCourse.title &&
            c.schedule == testCourse.schedule &&
            c.locations_summary == testCourse.locations_summary
          );
        })
      );
    });
  });
});
