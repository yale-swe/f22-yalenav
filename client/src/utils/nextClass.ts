import moment from "moment";
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
    const today = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ][now.getDay() - 1];
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
    nextClass = coursesStartTimes
      .filter((c: any) => {
        return currTime < c.startTime;
      })
      .sort((c1: any, c2: any) =>
        c1.startTime.localeCompare(c2.startTime)
      )[0].course;
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
  return courses.map((c: Course) => {
    return {
      course: c,
      startTime: convertMeridiemTime(c.schedule.split(" ", 2)[1].split("-")[0]),
    };
  });
};

const getTodayCourses = (courses: Course[], today: string) => {
  return courses.filter((c: Course) => {
    const courseDays = c.schedule.split(" ", 2)[0];

    // check if course schedule includes today -- all scenarios
    if (courseDays === "TTh") return ["Tuesday", "Thursday"].includes(today);
    else if (courseDays == "MW") return ["Monday", "Wednesday"].includes(today);
    else if (courseDays == "MWF")
      return ["Monday", "Wednesday", "Friday"].includes(today);
    else if (courseDays == "M-F")
      return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].includes(
        today
      );
    else if (courseDays == "M") return ["Monday"].includes(today);
    else if (courseDays == "T") return ["Tuesday"].includes(today);
    else if (courseDays == "W") return ["Wednesday"].includes(today);
    else if (courseDays == "Th") return ["Thursday"].includes(today);
    else if (courseDays == "F") return ["Friday"].includes(today);

    return false;
  });
};

const convertMeridiemTime = (time: string) => {
  return moment(capitalizeWords(time), ["h:mm A"]).format("HH:mm");
};
