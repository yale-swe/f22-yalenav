import { Request, Response, Router } from "express";
import { User, IUser } from "../models";
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
    // TODO: find all courses user has by id
    res.send({ user });
    return;
  }
  // create new user on first instance
  let user: IUser = await getUser(netid);
  await User.create(user);
  res.send({ user });
});

export default router;
