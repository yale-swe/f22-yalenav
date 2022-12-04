import { act, render, waitFor } from "@testing-library/react-native";
import { RoutingView } from "../src/components";
import { RoutingMode } from "../types";
import { mockCoords, mockWatson } from "./mockData";

const passResultsHandler = jest.fn();

// Mock the reasct native's map view and their directions / polyline component since we shouldnt be testing their lib
jest.mock("react-native-maps-directions", () => jest.fn());
jest.mock("react-native-maps", () => ({
  Polyline: jest.fn(),
}));

jest.mock("../src/utils", () => ({
  getShuttleRouteBetween: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("Testing the RoutingView", () => {
  test("Should be able to render non-shuttle route", async () => {
    // mock the results handler
    jest.mocked(passResultsHandler).mockResolvedValue([]);

    const mode = RoutingMode.noshuttle;

    expect(
      render(
        <RoutingView
          routeOrigin={mockCoords}
          mode={mode}
          routeDestination={mockWatson.coords}
          resultHandler={passResultsHandler}
        />
      )
    ).toBeDefined();
  });

  test("Should be able to render shuttle route", async () => {
    // mock the results handler
    jest.mocked(passResultsHandler).mockResolvedValue([]);

    // mock the call to our shuttle route
    let result = undefined;

    await act(async () => {
      await waitFor(async () => {
        result = render(
          <RoutingView
            routeOrigin={mockCoords}
            mode={RoutingMode.shuttle}
            routeDestination={mockWatson.coords}
            resultHandler={passResultsHandler}
          />
        );
      });
    });

    expect(result).toBeDefined();
  });
});
