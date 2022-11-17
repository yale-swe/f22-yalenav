import { Request, Response, Router } from "express";
import { Course } from "../models";
import { getCourses } from "../utils/coursetableCourses";

const router = Router();

module.exports = router;

router.get("/", async (_req: Request, res: Response) => {
  let courses = await Course.find();
  if (courses.length !== 0) {
    res.send({ courses });
    return;
  }
  // cache all courses; add them all to db on start up
  let allCourses: typeof Course[] = getCourses();
  await Course.create(allCourses);
  courses = await Course.find();
  res.send({ courses });
});

export default router;
