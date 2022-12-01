import request from "supertest";
import app from "../app";
import { connectMongoose, disconnectMongoose } from "../testUtils/mongoose";
import { isCI, isDevelopment, isTest } from "../utils/environment";

jest.mock("../utils/environment", () => ({
  isCI: jest.fn(),
  isDevelopment: jest.fn(),
  isTest: jest.fn(),
}));

describe("App Test", () => {
  beforeEach(async () => {
    await connectMongoose();
  });

  afterEach(async () => {
    await disconnectMongoose();
  });

  describe("Attempt to run app", () => {
    it("should fail to run app with invalid cors options", async () => {
      // kill all dev setup funcs
      jest.mocked(isCI).mockReturnValue(false);
      jest.mocked(isDevelopment).mockReturnValue(false);
      jest.mocked(isTest).mockReturnValue(false);
      // connection should be closed
      const { headers } = await request(app).get("/");
      expect(headers["connection"]).toEqual("close");
    });
  });
});
