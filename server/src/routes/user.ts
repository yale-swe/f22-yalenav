import { Request, Response, Router } from "express";
import { Course, IUser, User } from "../models";
import { getUser } from "../utils/yaliesUser";

const router = Router();

module.exports = router;

router.get("/", async (req: Request, res: Response) => {
  const netid: string = req.query.netid.toString();
  if (!netid)
    return res.status(400).send({ message: "Please provide a netid." });
  let result = await User.find({ netid: netid });
  if (result.length !== 0) {
    let user = result[0];
    res.send({ user });
    return;
  }
  // create new user on first instance
  let user: IUser = await getUser(netid);
  await User.create(user);
  res.send({ user });
});

// Add a course to schedule
router.post("/", async (req: Request, res: Response) => {
  const { netid, course_code } = req.query;
  const filter = { netid: netid.toString() };
  const addedCourse = await Course.findOne({
    course_code: course_code.toString(),
  });
  const update = { $push: { courses: addedCourse } };
  const oldUser = await User.findOneAndUpdate(filter, update);
  const user = await User.findOne({ netid: oldUser.netid });
  res.status(201).send({ user });
});

// Remove course from schedule
router.delete("/", async (req: Request, res: Response) => {
  const { netid, course_code } = req.query;
  const filter = { netid: netid.toString() };
  const addedCourse = await Course.findOne({
    course_code: course_code.toString(),
  });
  const update = { $pull: { courses: addedCourse } };
  const oldUser = await User.findOneAndUpdate(filter, update);
  const user = await User.findOne({ netid: oldUser.netid });
  res.status(201).send({ user });
});

export default router;
