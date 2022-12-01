import request from "supertest";
import app from "../app";
import { Building } from "../models";
import { connectMongoose, disconnectMongoose } from "../testUtils/mongoose";
import { getBuildings } from "../utils/campusBuildings";

describe("Buildings Tests", () => {
  let testBuilding = {
    name: "Smilow Field Center",
    address: "Derby Avenue, 249, New Haven, Ct, 06511",
    reference: "3640",
    abbreviation: "SFC",
    coords: {
      latitude: 41.311237,
      longitude: -72.959817,
    },
  };

  beforeEach(async () => {
    await connectMongoose();
  });

  afterEach(async () => {
    let testBuildings = await Building.find();
    await Promise.all(testBuildings.map((building) => building.remove()));
    await disconnectMongoose();
  });

  describe("Get Buildings", () => {
    it("should return all buildings only after fetching from external API and putting them into our db", async () => {
      // request all buildings from BuildingsV2 api and convert to Buildings
      let allBuildings: typeof Building[] = await getBuildings();
      let n = allBuildings.length;

      await Building.create(allBuildings);

      // fetch buildings from db
      const res = await request(app).get("/building");
      expect(res.status).toEqual(200);

      // check all are there
      expect(res.body.buildings).toHaveLength(n);
    });

    it("should cache and fetch all buildings from db ", async () => {
      // fetch buildings from db without
      const res = await request(app).get("/building");
      expect(res.status).toEqual(200);

      // check that the DB has been loaded in (i.e. not empty!)
      expect(res.body.buildings.length).toBeGreaterThan(0);

      expect(
        res.body.buildings.filter((b: any) => {
          return b && b.name == testBuilding.name;
        })
      );
    });
  });
});
