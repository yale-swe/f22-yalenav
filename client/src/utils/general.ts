import { Building } from "../../types";

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
