import React, { useState } from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import { mockCourse, mockCPSC323, userCourse, userNoCourses } from "./mockData";
import { ScheduleForm } from "../src/components";

import {
  addCourseToSchedule,
  deleteCourseFromSchedule,
  getCourses,
  limitString,
  searchFilterCourses,
} from "../src/utils";

jest.mock("../src/utils", () => ({
  addCourseToSchedule: jest.fn(),
  getCourses: jest.fn(),
  deleteCourseFromSchedule: jest.fn(),
  searchFilterCourses: jest.fn(),
  limitString: jest.fn(),
}));

import { User } from "../types";

const renderSchedule = async (user: User) => {
  let screen: any;
  await act(async () => {
    // Add this section to avoid the 'Can't access .root on unmounted test renderer' error
    await waitFor(() => {
      screen = render(<ScheduleForm user={user} />);
    });
  });
  return screen;
};
describe("Testing the Profile's Edit Schedule Screen", () => {
  test("A user with no courses should have no courses displayed", async () => {
    const screen = await renderSchedule(userNoCourses);
    expect(screen.queryByText(mockCourse.schedule)).toBeNull();
  });

  test("A user with a course should have a course displayed", async () => {
    const screen = await renderSchedule(userCourse);
    expect(screen.getByText(mockCourse.schedule)).toBeTruthy();
  });

  test("A user with courses in their schedule can delete a course", async () => {
    jest.mocked(deleteCourseFromSchedule).mockResolvedValue(userNoCourses);

    const screen = await renderSchedule(userCourse);
    expect(screen.getByText(mockCourse.schedule)).toBeTruthy();

    await act(async () => {
      // Add this section to avoid the 'Can't access .root on unmounted test renderer' error
      await waitFor(() => {
        fireEvent.press(screen.getByTestId("DeleteCourse"));
      });
    });

    expect(screen.queryByText(mockCourse.schedule)).toBeNull();
  });

  test("A user can add a course to their schedule", async () => {
    // Return the, user but with the course added to their courses array
    jest.mocked(addCourseToSchedule).mockResolvedValue(userCourse);
    jest.mocked(getCourses).mockResolvedValue([mockCourse, mockCPSC323]);
    jest.mocked(searchFilterCourses).mockReturnValue(true);

    // Had to copy the implementation of limitString because ../src/utils is mocked
    jest.mocked(limitString).mockImplementation((str: string, n: number) => {
      return str.length > n ? str.slice(0, n) + "... " : str;
    });

    const screen = await renderSchedule(userNoCourses);
    expect(screen.queryByText(mockCourse.schedule)).toBeNull();

    // Have to wrap these actions in act() because the events change the state
    await act(async () => {
      // Add this section to avoid the 'Can't access .root on unmounted test renderer' error
      await waitFor(async () => {
        const searchBar = screen.getByPlaceholderText(
          "Search for a Yale course..."
        );

        // Search for the mockCourse and click it to add it to course list
        fireEvent.changeText(searchBar, mockCourse.course_code);
        fireEvent.press(screen.getByText(mockCourse.course_code));
      });
    });

    // Course should now be on the screen
    expect(screen.getByText(mockCourse.schedule)).toBeTruthy();
  });
});
