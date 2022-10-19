import { Request, Response, Router } from "express";
import { Building } from "../models";
import { getBuildings } from "../utils/campusBuildings";

const router = Router();

module.exports = router;

router.get("/", async (_req: Request, res: Response) => {
  let buildings = await Building.find();
  if (buildings.length !== 0) {
    res.send({ buildings });
    return;
  }
  // cache all buildings; add them all to db on start up
  let allBuildings: typeof Building[] = await getBuildings();
  await Building.create(allBuildings);
  buildings = await Building.find();
  res.send({ buildings });
});

router.post("/", async (req: Request, res: Response) => {
  const { name, address, abbreviation, lat, lon } = req.body;
  const building = await Building.create({
    name,
    address,
    abbreviation,
    lat,
    lon,
  });
  res.status(201).send({
    building,
  });
});

export default router;
