import request from "request";
import { connectMongoose, disconnectMongoose } from "../testUtils/mongoose";
import { getBuildings } from "../utils/campusBuildings";

jest.mock("request");

describe("API Tests", () => {
  beforeEach(async () => {
    await connectMongoose();
  });

  afterEach(async () => {
    await disconnectMongoose();
  });

  describe("Get Buildings from BuildingsV2", () => {
    it("should do nothing if the API is broken", async () => {
      jest.mocked(request).mockImplementation(() => {
        throw new Error();
      });
      expect(getBuildings()).rejects.toThrowError();
    });
  });
});
