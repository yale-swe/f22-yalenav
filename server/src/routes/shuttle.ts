import { Request, Response, Router } from "express";
import { ShuttleStop } from "../models";
import { getStops } from "../utils/shuttleStops";

const router = Router();

module.exports = router;

router.get("/", async (_req: Request, res: Response) => {
  let stops = await ShuttleStop.find();
  if (stops.length !== 0) {
    res.send({ stops });
    return;
  }
  // cache all buildings; add them all to db on start up
  let allStops: typeof ShuttleStop[] = await getStops();
  await ShuttleStop.create(allStops);
  stops = await ShuttleStop.find();
  res.send({ stops });
});

router.post("/", async (req: Request, res: Response) => {
  const { name, address, abbreviation, lat, lon } = req.body;
  const stop = await ShuttleStop.create({
    name,
    address,
    abbreviation,
    lat,
    lon,
  });
  res.status(201).send({
    stop,
  });
});

export default router;
