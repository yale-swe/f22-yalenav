import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { NavigationBar } from "../src/components";

const mockSelectNextClassHandler = jest.fn();

const clickDirectionButton = () => {
  const result = render(
    <NavigationBar selectNextClass={mockSelectNextClassHandler} />
  );

  fireEvent.press(result.container);
  return result;
};

describe("Testing the Homepages's Navigation Bar", () => {
  test("Should be able to render", async () => {
    expect(
      render(<NavigationBar selectNextClass={mockSelectNextClassHandler} />)
    ).toBeDefined();
  });
});
