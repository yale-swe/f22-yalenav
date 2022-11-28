import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";

import { NextClass } from "../src/components/shortcut/NextClass";

import { getUser, nextClass } from "../src/utils";
jest.mock("../src/utils", () => ({
  getUser: jest.fn(),
  nextClass: jest.fn(),
}));
import { Alert } from "react-native";

import { User } from "../types";
import { View } from "react-native";
import { mockCourse } from "./mockData/courseMock";

const userNoCourses: User = {
  first_name: "John",
  last_name: "Doe",
  netid: "abc123",
  school: "Franklin",
  year: "2023",
  curriculum: "N/a",
  college: "Franklin",
};

const userCourse: User = {
  first_name: "John",
  last_name: "Doe",
  netid: "abc123",
  school: "Franklin",
  year: "2023",
  curriculum: "N/a",
  college: "Franklin",
  courses: [mockCourse],
};

const renderedComponent = async (user: any) => {
  // Mock getUser Function that is used in NextClass component
  const mockedGetUser = jest.mocked(getUser);
  mockedGetUser.mockResolvedValue(user);

  let result = render(<View />);

  await act(async () => {
    await waitFor(() => {
      result = render(<NextClass selectNextClass={mockSelectNextClass} />);
    });
  });
  fireEvent.press(result.getByTestId("NextClassButton"));
};

beforeEach(() => {
  jest.spyOn(Alert, "alert");
});

// Clean up the spyOn mock after each test
afterEach(() => {
  jest.clearAllMocks();
});

const mockSelectNextClass = () => {};
describe("Testing the Homepage's Next Class Button", () => {
  test("User with no course today clicks the button", async () => {
    const mockedNextClass = jest.mocked(nextClass);
    mockedNextClass.mockReturnValue(undefined);

    await renderedComponent(userCourse);

    expect(Alert.alert).toHaveBeenCalledWith(
      "No class today... 🏝",
      "Time to relax."
    );
  });

  test("User not signed in clicks next class button", async () => {
    const userNotSignedIn = null;
    await renderedComponent(userNotSignedIn);

    expect(Alert.alert).toHaveBeenCalledWith("Sign in to use this feature");
  });

  test("User with no courses clicks the next class button", async () => {
    await renderedComponent(userNoCourses);

    expect(Alert.alert).toHaveBeenCalledWith(
      "Empty schedule... 📚",
      "Add courses by editing your schedule in profile settings."
    );
  });

  test("User with course for the current day clicks the next class button", async () => {
    const mockedNextClass = jest.mocked(nextClass);
    mockedNextClass.mockReturnValue(mockCourse);

    await renderedComponent(userCourse);

    expect(Alert.alert).toHaveBeenCalledTimes(0);
  });
});
