import { Alert, Linking } from "react-native";
import { Building, Course, LatLng } from "../../types";

export const sendLocationNotification = () => {
  Alert.alert(
    "Please enable location in settings.",
    "YaleNav needs your location to provide routing details. The estimated distance is using Yale University's approximate location.",
    [
      {
        text: "Okay",
        onPress: () => {
          Linking.openURL("app-settings:");
        },
      },
    ]
  );
};

export const searchFilterCourses = (course: Course, searchTerm: String) => {
  // simplest algorithm around: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
  const searchSubstring = (str1: String, str2: String) => {
    return str1.toUpperCase().indexOf(str2.toUpperCase()) > -1;
  };
  // search across course title and course code
  return searchTerm
    ? searchSubstring(course.title, searchTerm) ||
        searchSubstring(course.course_code, searchTerm)
    : 0;
};

// simplest algorithm around: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
export const searchSubstring = (str1: String, str2: String) => {
  return str1.toUpperCase().indexOf(str2.toUpperCase()) > -1;
};

export const searchFilterBuildings = (
  location: Building,
  searchTerm: String
) => {
  // search across name, address, and abbreviation
  return searchTerm
    ? searchSubstring(location.name, searchTerm) ||
        searchSubstring(location.address, searchTerm) ||
        searchSubstring(location.abbreviation, searchTerm) ||
        searchSubstring(location.type, searchTerm)
    : 0;
};

export const limitString = (str: string, n: number): string => {
  // https://stackoverflow.com/questions/1199352/smart-way-to-truncate-long-strings
  return str.length > n ? str.slice(0, n) + "... " : str;
};

export const getDistance = (location1: Building, location2: Building) => {
  const latToMiles = 69;
  const lonToMiles = 54.6;
  const latDelta =
    (location2.coords.latitude - location1.coords.latitude) * latToMiles;
  const lonDelta =
    (location2.coords.longitude - location1.coords.longitude) * lonToMiles;
  // distance formula
  return Math.sqrt(Math.pow(latDelta, 2) + Math.pow(lonDelta, 2));
};

// Algorithm for computing disance between two points taken from: https://www.geeksforgeeks.org/program-distance-two-points-earth/
export const computeDistance = (loc1: LatLng, loc2: LatLng): number => {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.

  let lon1 = (loc1.longitude * Math.PI) / 180;
  let lon2 = (loc2.longitude * Math.PI) / 180;
  let lat1 = (loc2.latitude * Math.PI) / 180;
  let lat2 = (loc2.latitude * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 3956;
  return c * r;
};

// https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
export const capitalizeWords = (s: String) => {
  return s
    .toLowerCase()
    .split(" ")
    .map((s: String) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
};
