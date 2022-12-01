import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { CampusSpots } from "../src/components/search/CampusSpots";
import { colleges, diningHalls, libraries } from "./mockData";
import { Building } from "../types";

const mockAllBuildings = colleges.concat(diningHalls).concat(libraries);

let mockSetBuildings: any;
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

const untoggleCampusSpotbutton = async (
  campusSpotName: string,
  campusSpotMockData: Array<Building>,
  screen: any
) => {
  fireEvent.press(await screen.findByText(campusSpotName));
  fireEvent.press(await screen.findByText(campusSpotName));

  // SetBuildings function should be called twice
  expect(mockSetBuildings).toBeCalledTimes(2);

  // First call should be with the campus spots mock data
  expect(mockSetBuildings).toHaveBeenNthCalledWith(1, campusSpotMockData);

  // Second Call should be with All Buildings
  expect(mockSetBuildings).toHaveBeenNthCalledWith(2, mockAllBuildings);
};

beforeEach(() => {
  mockSetBuildings = jest.fn();
});

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

  test("User has clicked on Libraries button twice to untoggle it and show all buildings", async () => {
    const screen = renderCampusSpots();

    await untoggleCampusSpotbutton("Libraries", libraries, screen);
  });

  test("User has clicked on Dining Halls button twice to untoggle it and show all buildings", async () => {
    const screen = renderCampusSpots();

    await untoggleCampusSpotbutton("Dining Halls", diningHalls, screen);
  });

  test("User has clicked on Colleges button twice to untoggle it and show all buildings", async () => {
    const screen = renderCampusSpots();

    await untoggleCampusSpotbutton("Colleges", colleges, screen);
  });
});
