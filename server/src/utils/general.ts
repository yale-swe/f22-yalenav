// https://stackoverflow.com/questions/4878756/how-to-capitalize-first-letter-of-each-word-like-a-2-word-city
export const capitalizeWords = (s: String) => {
  return s
    .toLowerCase()
    .split(" ")
    .map((s: String) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");
};
