import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { Alert, View } from "react-native";
import { NextClass } from "../src/components/shortcut/NextClass";
import { getUser, nextClass } from "../src/utils";
import { mockCourse } from "./mockData/courseMock";
import { userCourse, userNoCourses } from "./mockData/usersMock";
import { AuthProvider } from "../src/contexts/Auth";

jest.mock("../src/utils", () => ({
  getUser: jest.fn(),
  nextClass: jest.fn(),
}));

const renderedComponent = async (user: any) => {
  // Mock getUser Function that is used in NextClass component
  const mockedGetUser = jest.mocked(getUser);
  mockedGetUser.mockResolvedValue(user);

  let result = render(<View />);

  await act(async () => {
    await waitFor(() => {
      result = render(
        <AuthProvider>
          <NextClass selectNextClass={mockSelectNextClass} />
        </AuthProvider>
      );
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
  test("A user is signed in, has courses in their schedule, but does not have class for the current day, and clicks next class button", async () => {
    const mockedNextClass = jest.mocked(nextClass);
    mockedNextClass.mockReturnValue(undefined);

    await renderedComponent(userCourse);

    expect(Alert.alert).toHaveBeenCalledWith(
      "No class today... 🏝",
      "Time to relax."
    );
  });

  test("A user is not signed in, but clicks the next class button", async () => {
    const userNotSignedIn = null;
    await renderedComponent(userNotSignedIn);

    expect(Alert.alert).toHaveBeenCalledWith("Sign in to use this feature");
  });

  test("A user is signed in, but has no courses in their schedule, and clicks the next class button", async () => {
    await renderedComponent(userNoCourses);

    expect(Alert.alert).toHaveBeenCalledWith(
      "Empty schedule... 📚",
      "Add courses by editing your schedule in profile settings."
    );
  });

  test("A user is signed in, has courses in their schedule, and has class for the current day, and clicks the next class button", async () => {
    const mockedNextClass = jest.mocked(nextClass);
    mockedNextClass.mockReturnValue(mockCourse);

    await renderedComponent(userCourse);

    expect(Alert.alert).toHaveBeenCalledTimes(0);
  });
});
