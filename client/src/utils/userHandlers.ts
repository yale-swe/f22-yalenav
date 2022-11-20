import axios from "axios";
import { User } from "../../types";
import { BACKEND } from "../constants";

export const getUser = async (netid: string) => {
  return axios
    .get<{ user: User }>(`${BACKEND}/user?netid=${netid}`)
    .then((res) => {
      return res.data.user;
    })
    .catch((err) => {
      console.log(err);
    });
};
