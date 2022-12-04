import request from "supertest";
import app from "../app";
import { ShuttleStop } from "../models";
import { connectMongoose, disconnectMongoose } from "../testUtils/mongoose";
import { getStops } from "../utils/shuttleStops";

describe("ShuttleStop Tests", () => {
  let testStop = {
    name: "Union Station (Northbound)",
    id: 118,
    lat: 41.297492,
    lon: -72.927109,
  };

  beforeEach(async () => {
    await connectMongoose();
  });

  afterEach(async () => {
    let testStops = await ShuttleStop.find();
    await Promise.all(testStops.map((stop) => stop.remove()));
    await disconnectMongoose();
  });

  describe("Get ShuttleStops", () => {
    it("should return all shuttle stops only after fetching from external API and putting them into our db", async () => {
      // request all buildings from DoubleMap api and convert to ShuttleStops
      let allStops: typeof ShuttleStop[] = await getStops();
      let n = allStops.length;

      await ShuttleStop.create(allStops);

      // fetch buildings from db
      const res = await request(app).get("/shuttlestop");
      expect(res.status).toEqual(200);

      // check all are there
      expect(res.body.stops).toHaveLength(n);
    });

    it("should cache and fetch all shuttles from db ", async () => {
      // fetch shuttle stops from db without
      const res = await request(app).get("/shuttlestop");
      expect(res.status).toEqual(200);

      // check that the DB has been loaded in (i.e. not empty!)
      expect(res.body.stops.length).toBeGreaterThan(0);

      expect(
        res.body.stops.filter((s: any) => {
          return s && s.name == testStop.name;
        })
      );
    });
  });
});
