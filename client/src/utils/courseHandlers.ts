import axios from "axios";
import { Course, User } from "../../types";
import { BACKEND } from "../constants";

export const getCourses = async () => {
  return axios.get<{ courses: Course[] }>(`${BACKEND}/course`).then((res) => {
    return res.data.courses;
  });
};

// Course addition
export const addCourseToSchedule = async (user: User, course_code: string) => {
  return axios
    .post<{ user: User }>(
      `${BACKEND}/user?netid=${user.netid}&course_code=${course_code}`
    )
    .then((res) => {
      console.log(`Added ${course_code} to schedule! –– ${res}`);
      return res.data.user;
    })
    .catch((err) => {
      console.log("Failed to add to your schedule");
      console.log(err);
    });
};

// Course deletion
export const deleteCourseFromSchedule = async (
  user: User,
  course_code: string
) => {
  return axios
    .delete<{ user: User }>(
      `${BACKEND}/user?netid=${user.netid}&course_code=${course_code}`
    )
    .then((res) => {
      console.log(`Deleted ${course_code} from schedule!`);
      return res.data.user;
    })
    .catch((err) => {
      console.log(err);
    });
};
