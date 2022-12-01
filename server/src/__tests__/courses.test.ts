import request from "supertest";
import app from "../app";
import { Course } from "../models";
import { connectMongoose, disconnectMongoose } from "../testUtils/mongoose";
import { getCourses } from "../utils/coursetableCourses";

describe("Courses Tests", () => {
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
            c.course_code == testCourse.course_code &&
            c.schedule == testCourse.schedule &&
            c.locations_summary == testCourse.locations_summary
          );
        })
      );

      // fetch buildings from db
      const res_cached = await request(app).get("/course");
      expect(res_cached.status).toEqual(200);

      // check that the DB has been loaded in (i.e. not empty!)
      expect(res_cached.body.courses.length).toBeGreaterThan(0);
    });
  });

  let netid = "vs399";
  let valid_course_code: String = "CPSC 422";
  let invalid_course_code: String = "CPSC 666";

  describe("Edit User Schedule", () => {
    it("Shouled seamlessly edit their schedules", async () => {
      // fetch user
      await request(app).get(`/user?netid=${netid}`);
      const res_add = await request(app).post(
        `/user?netid=${netid}&course_code=${valid_course_code}`
      );
      expect(res_add.status).toEqual(201);
      expect(res_add.body.user.courses).toHaveLength(1);

      // fetch user
      const res_failed_add = await request(app).post(
        `/user?netid=${netid}&course_code=${invalid_course_code}`
      );
      expect(res_failed_add.status).toEqual(400);

      // should not add duplicate course to their schedule
      const res_failed_dup = await request(app).post(
        `/user?netid=${netid}&course_code=${valid_course_code}`
      );
      expect(res_failed_dup.status).toEqual(400);

      // should delete course from their schedule
      const res_deleted = await request(app).delete(
        `/user?netid=${netid}&course_code=${valid_course_code}`
      );
      expect(res_deleted.status).toEqual(201);

      expect(res_deleted.body.user.courses).toHaveLength(0);
    });
  });
});
