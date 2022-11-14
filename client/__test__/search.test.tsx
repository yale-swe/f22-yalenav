import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Search } from "../src/components/search/Search";
import { Building, LatLng } from "../types";

const mockCoords: LatLng = { latitude: 40, longitude: -72 };
const mockWatson: Building = {
  _id: "asdfasf",
  name: "Watson Center",
  address: "Sachem Street, 60, New Haven, Ct, 06511",
  abbreviation: "Wts",
  coords: mockCoords,
  tile: [mockCoords],
};

const enterQuery = (query: string) => {
  const result = render(
    <Search locations={mockBuildings} selectLocation={mockSelectLocation} />
  );
  const input = result.getByPlaceholderText("Search for a Yale Location...");
  fireEvent.changeText(input, query);
  return result;
};

const mockBuildings: Array<Building> = [mockWatson];
const mockSelectLocation = () => {};
describe("Testing the Homepage's Search Bar", () => {
  test("Text can be entered in the search bar", async () => {
    const query = "Wts";
    const enterQueryResult = enterQuery(query);
    expect(enterQueryResult.getByDisplayValue(query)).toBeDefined();
  });

  test("Result is clickable", async () => {
    const query = "Wts";
    const enterQueryResult = enterQuery(query);

    fireEvent.press(enterQueryResult.getByText(mockWatson.name));

    // Upon clicking the result, the value in the search bar automatically changes to the building's name and not abbreviation.
    expect(enterQueryResult.getByDisplayValue(mockWatson.name)).toBeDefined();
  });
});

test("simple", () => {
  expect(1).toBeGreaterThan(0);
});
