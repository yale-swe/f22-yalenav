import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { MapBanner } from "../src/components/map/MapBanner";
import { mockResultWatson, mockWatson } from "./mockData";

const mockNavigationHandler = () => {};

const clickDirectionButton = () => {
  const result = render(
    <MapBanner
      origin={{ latitude: 41.3163083, longitude: -72.922607 }}
      selectedLocation={mockWatson}
      navigationHandler={mockNavigationHandler}
      results={mockResultWatson}
    />
  );

  const input = result.getByText("Directions");
  fireEvent.press(input);
  return result;
};

describe("Testing the Homepages's Map Banner", () => {
  test("Clicking Direction Button Displays Time Estimate", async () => {
    const clickedButton = clickDirectionButton();
    const duration = Math.ceil(mockResultWatson[0].duration).toString();

    expect(clickedButton.getByText(duration));
    expect(clickedButton.getByText("min"));
  });

  test("Clicking Direction Button Displays Steps", async () => {
    const clickedButton = clickDirectionButton();
    const distance = mockResultWatson[0].legs
      ? mockResultWatson[0].legs[0].steps[0].distance.text
      : null;

    const duration = mockResultWatson[0].legs
      ? mockResultWatson[0].legs[0].steps[0].duration.text
      : null;

    expect(clickedButton.getByText(`${duration} ↓ ${distance}`));
  });
});
