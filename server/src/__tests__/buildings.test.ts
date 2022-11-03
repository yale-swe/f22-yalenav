import request from "supertest";
import app from "../app";
import { connectMongoose, disconnectMongoose } from "../testUtils/mongoose";
import { Building } from "../models";
import { getBuildings } from "../utils/campusBuildings";

describe("Buildings Tests", () => {
  let testBuildings: typeof Building[] = [];
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
    await Promise.all(testBuildings.map((building) => building.remove()));
    await disconnectMongoose();
  });

  describe("Get Buildings", () => {
    it("should get all buildings", async () => {
      // request all buildings from BuildingsV2 api and convert to Buildings
      let allBuildings: typeof Building[] = await getBuildings();
      let n = allBuildings.length;
      // fetch buildings from db
      const res = await request(app).get("/building");
      expect(res.status).toEqual(200);
      // check all are there
      expect(res.body.buildings).toHaveLength(n);
    });
  });

  describe("Create Building", () => {
    it("should create a building", async () => {
      const res = await request(app).post("/building").send(testBuilding);
      expect(res.status).toEqual(201);
      testBuildings = await Promise.all([
        Building.findOne({ name: testBuilding.name }),
      ]);
      expect(testBuildings).toHaveLength(1);
      expect(testBuildings[0]).toBeTruthy();
    });
  });
});
