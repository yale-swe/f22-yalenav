import request from "supertest";
import app from "../app";
import { connectMongoose, disconnectMongoose } from "../testUtils/mongoose";
import { Building } from "../models";
import { getBuildings } from "../utils/campusBuildings";

describe("Buildings Tests", () => {
  let testBuildings: typeof Building[] = [];

  beforeEach(async () => {
    await connectMongoose();
  });

  afterEach(async () => {
    await Promise.all(testBuildings.map((building) => building.remove()));
    await disconnectMongoose();
  });

  describe("Get Buildings", () => {
    it("should get no buildings", async () => {
      const res = await request(app).get("/building");
      expect(res.status).toEqual(200);
      expect(res.body.buildings).toEqual([]);
    });
    it(`should get 1 building`, async () => {
      testBuildings = await Building.create([
        {
          name: "Smilow Field Center",
          address: "Derby Avenue, 249, New Haven, Ct, 06511",
          lat: 41.311237,
          lon: -72.959817,
        },
      ]);
      const res = await request(app).get("/building");
      expect(res.status).toEqual(200);
      expect(res.body.buildings).toHaveLength(1);
    });

    it(`should get all buildings`, async () => {
      // request all buildings from BuildingsV2 api and convert to Buildings
      let allBuildings: typeof Building[] = await getBuildings();
      let n = allBuildings.length;
      // add all buildings to db
      testBuildings = await Building.create(allBuildings);
      const res = await request(app).get("/building");
      expect(res.status).toEqual(200);
      // check all are there
      expect(res.body.buildings).toHaveLength(n);
    });
  });
});
