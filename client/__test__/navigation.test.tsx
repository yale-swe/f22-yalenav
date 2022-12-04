import { render } from "@testing-library/react-native";
import React from "react";
import { NavigationBar, SideBar } from "../src/components";
import { mockCoords } from "./mockData";

const mockSelectNextClassHandler = jest.fn();
const mockCenterOnEvent = jest.fn();
const mockToggleSwitch = jest.fn();

jest.mock("../src/components/shortcut/NextClass", () => ({
  NextClass: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("Testing the Homepages's Navigation Bar", () => {
  test("Should be able to render", async () => {
    expect(
      render(<NavigationBar selectNextClass={mockSelectNextClassHandler} />)
    ).toBeDefined();
  });
});

describe("Testing the Homepages's Side Bar", () => {
  test("Should be able to render", async () => {
    expect(
      render(
        <SideBar
          origin={mockCoords}
          centerOnEvent={mockCenterOnEvent}
          toggleSwitch={mockToggleSwitch}
          shuttleEnabled={false}
        />
      )
    ).toBeDefined();
  });
});
