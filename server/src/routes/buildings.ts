import { Request, Response, Router } from "express";
import { Building } from "../models";

const router = Router();

module.exports = router;

router.get("/", async (_req: Request, res: Response) => {
  const buildings = await Building.find();
  res.send({ buildings });
});

export default router;
