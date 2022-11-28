import request from "supertest";
import app from "../app";
import { connectMongoose, disconnectMongoose } from "../testUtils/mongoose";
import { ShuttleStop } from "../models";
import { getStops } from "../utils/shuttleStops";

describe("ShuttleStop Tests", () => {
  let testStops: typeof ShuttleStop[] = [];
  let testStop = {
    name: "Union Station (Northbound)",
    id: 118,
    lat: 41.297492,
    lon: -72.927109,
  };
//     name: "Smilow Field Center",
//     address: "Derby Avenue, 249, New Haven, Ct, 06511",
//     reference: "3640",
//     abbreviation: "SFC",
//     coords: {
//       latitude: 41.311237,
//       longitude: -72.959817,
//     },
//   };

  beforeEach(async () => {
    await connectMongoose();
  });

  afterEach(async () => {
    await Promise.all(testStops.map((stop) => stop.remove()));
    await disconnectMongoose();
  });

  describe("Get ShuttleStops", () => {
    it("should get all Yale Shuttle stops", async () => {
      // request all buildings from BuildingsV2 api and convert to Buildings
      let allStops: typeof ShuttleStop[] = await getStops();
      let n = allStops.length;
      // fetch buildings from db
      const res = await request(app).get("/shuttlestop");
      expect(res.status).toEqual(200);
      // check all are there
      expect(res.body.shuttlestop).toHaveLength(n);
    });
  });
});
