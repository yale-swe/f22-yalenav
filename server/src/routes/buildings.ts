import { Request, Response, Router } from "express";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const buildings = {};
  res.send({ buildings });
});

export default router;
