import { Building, LatLng } from "../../types";

export const searchFilter = (location: Building, searchTerm: String) => {
  // simplest algorithm around: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
  const searchSubstring = (str1: String, str2: String) => {
    return str1.toUpperCase().indexOf(str2.toUpperCase()) > -1;
  };
  // search across name, address, and abbreviation
  return searchTerm
    ? searchSubstring(location.name, searchTerm) ||
        searchSubstring(location.address, searchTerm) ||
        searchSubstring(location.abbreviation, searchTerm)
    : 0;
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
