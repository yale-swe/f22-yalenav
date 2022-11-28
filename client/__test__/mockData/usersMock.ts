import { User } from "../../types";
import { mockCourse } from "./courseMock";

export const userNoCourses: User = {
  first_name: "John",
  last_name: "Doe",
  netid: "abc123",
  school: "Franklin",
  year: "2023",
  curriculum: "N/a",
  college: "Franklin",
};

export const userCourse: User = {
  first_name: "John",
  last_name: "Doe",
  netid: "abc123",
  school: "Franklin",
  year: "2023",
  curriculum: "N/a",
  college: "Franklin",
  courses: [mockCourse],
};
