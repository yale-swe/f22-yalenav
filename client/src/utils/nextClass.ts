import moment from "moment";
import { searchSubstring } from ".";
import { Building, Course, User } from "../../types";
import { capitalizeWords } from "./general";

// Used for testing purpose; feel free to modify
const DUMMY_TODAY = "M";
const DUMMY_TIME = "08:43";

export const nextClass = (user: User | undefined) => {
  let nextClass = undefined;

  // must be signed in and have courses to use this feature
  if (user && user.courses) {
    const now = new Date();

    // get first letter of today
    const today = ["M", "T", "W", "Th", "F", "S", "Su"][now.getDay() - 1];
    const todayCourses = getTodayCourses(user.courses, today);

    // only care about courses happening today
    if (!todayCourses.length) {
      console.log("No class today! Relax 🏝");
      return nextClass;
    }

    // format courses into {course: course, startTime: time} objects
    const coursesStartTimes = getCoursesStartTime(todayCourses);

    // parse current time
    const hour = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const currTime = hour + ":" + minutes;

    // get soonest class happening after current time
    const nextClasses = coursesStartTimes
      .filter((c: any) => {
        return currTime < c.startTime;
      })
      .sort((c1: any, c2: any) => c1.startTime.localeCompare(c2.startTime));

    if (nextClasses.length) nextClass = nextClasses[0].course;
  }
  return nextClass;
};

export const getCourseLocation = (
  course: Course,
  buildings: Building[]
): Building | undefined => {
  // get course location code
  const course_loc_abbr = course.locations_summary.split(" ")[0];

  // find buildings with that code
  const filteredBuilding = buildings.filter((b: Building) => {
    return b.abbreviation === course_loc_abbr;
  });

  if (!filteredBuilding.length) return;
  // there should only one building with that abbreviation
  return filteredBuilding[0];
};

// expected format is for a course schedule is [DD] [H:M(am/pm)-H:M(am/pm)]
const getCoursesStartTime = (courses: Course[]) => {
  if (!courses) return [];
  return courses.map((c: Course) => {
    return {
      course: c,
      startTime: convertMeridiemTime(c.schedule.split(" ", 2)[1].split("-")[0]),
    };
  });
};

const getTodayCourses = (courses: Course[], today: string) => {
  if (!courses) return [];
  return courses.filter((c: Course) => {
    const courseDays = c.schedule.split(" ", 2)[0];
    if (courseDays == undefined || today == undefined) return true;
    // either everyday, or one day
    return (
      searchSubstring(courseDays, "-") || searchSubstring(courseDays, today)
    );
  });
};

const convertMeridiemTime = (time: string) => {
  return moment(capitalizeWords(time), ["h:mm A"]).format("HH:mm");
};
