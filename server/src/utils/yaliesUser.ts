import { IUser } from "../models";

const yalies = require("yalies");

const YALIES_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Njc5MzcxNzksInN1YiI6InBuMjU4In0.royqh0iG-eqHewwq6xu8_ll2SRrqb_xZGYRC_50uTnk";

const api = new yalies.API(YALIES_KEY);

interface YaliesUserObject {
  first_name?: String;
  last_name?: String;
  netid?: String;
  school?: String;
  year?: String;
  curriculum?: String;
  college?: String;
}

export const getUser = async (netid: String): Promise<IUser> => {
  let yalie: YaliesUserObject = {};
  return api
    .people({
      query: netid,
      page: 1,
      page_size: 1,
    })
    .then((people: any) => {
      yalie = people[0];
      return formatUser(yalie);
    })
    .catch((_err: any) => {
      const yalie: YaliesUserObject = {
        first_name: "You're not an undergrad",
        last_name: "Placeholder",
        netid: netid,
        school: "🤷‍♂️",
        year: "🤷2022",
        curriculum: "🤷‍♂️",
        college: "🤷‍♂️",
      };
      return formatUser(yalie);
    });
};

const formatUser = (yalie: YaliesUserObject): IUser => {
  return {
    first_name: yalie.first_name,
    last_name: yalie.last_name,
    netid: yalie.netid,
    school: yalie.school,
    year: yalie.year,
    curriculum: yalie.curriculum,
    college: yalie.college,
  };
};
