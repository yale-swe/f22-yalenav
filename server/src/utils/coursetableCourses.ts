import { Course } from "../models";

interface CoursetableObject {
  title: String;
  course_code: String;
  locations_summary: String;
  times_summary: String;
}

const COURSETABLENDPOINT = `https://api.coursetable.com/api/static/catalogs/202203.json`;

export const getCourses = (): typeof Course[] => {
  // Endpoint currently not working; temp fix
  const coursesJson = require("../data//courses.json");
  let coursesList: CoursetableObject[] = coursesJson;
  let courses: typeof Course[] = formatCourses(coursesList);
  return courses;
};

// from Coursetable format to Mongoose format
const formatCourses = (coursesList: CoursetableObject[]): typeof Course[] => {
  return coursesList
    .filter((c: CoursetableObject) => {
      return c;
    })
    .map((c: CoursetableObject) => {
      return formatCourse(c);
    });
};

const formatCourse = (course: CoursetableObject): any => {
  return new Course({
    title: course.title,
    course_code: course.course_code,
    locations_summary: course.locations_summary,
    schedule: course.times_summary,
  });
};
