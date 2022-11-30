import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { CampusSpots } from "../src/components/search/CampusSpots";
import { colleges, diningHalls, libraries } from "./mockData";

const mockSetBuildings = jest.fn();
const mockAllBuildings = colleges.concat(diningHalls).concat(libraries);

// Render the Campus Spots Component and pass the mockdata as props
const renderCampusSpots = () => {
  const screen = render(
    <CampusSpots
      collegeBuildings={colleges}
      diningHallBuildings={diningHalls}
      libraryBuildings={libraries}
      allBuildings={mockAllBuildings}
      setBuildingsToRender={mockSetBuildings}
    />
  );
  return screen;
};

describe("Testing the Homescreen's Campus Spots Component", () => {
  test("User has not clicked any of the campus spots", async () => {
    renderCampusSpots();
    expect(mockSetBuildings).toBeCalledTimes(0);
  });

  test("User has clicked on Colleges button", async () => {
    const screen = renderCampusSpots();

    fireEvent.press(await screen.findByText("Colleges"));

    expect(mockSetBuildings).toBeCalledWith(colleges);
  });

  test("User has clicked on Dining Hall button", async () => {
    const screen = renderCampusSpots();

    fireEvent.press(await screen.findByText("Dining Halls"));

    expect(mockSetBuildings).toBeCalledWith(diningHalls);
  });

  test("User has clicked on Libraries button", async () => {
    const screen = renderCampusSpots();

    fireEvent.press(await screen.findByText("Libraries"));

    expect(mockSetBuildings).toBeCalledWith(libraries);
  });
});
