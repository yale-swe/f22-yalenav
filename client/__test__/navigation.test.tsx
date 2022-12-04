import { render } from "@testing-library/react-native";
import React from "react";
import { NavigationBar } from "../src/components";

const mockSelectNextClassHandler = jest.fn();

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
