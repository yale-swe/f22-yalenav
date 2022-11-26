import mongoose from "mongoose";
import { CourseSchema, ICourse } from ".";

const UserSchema = new mongoose.Schema({
  first_name: {
    type: "string",
    required: true,
  },
  last_name: {
    type: "string",
    required: true,
  },
  netid: {
    type: "string",
    required: true,
  },
  school: {
    type: "string",
    required: true,
  },
  year: {
    type: "string",
    required: true,
  },
  curriculum: {
    type: "string",
  },
  college: {
    type: "string",
    required: true,
  },
  courses: [
    {
      type: CourseSchema,
    },
  ],
});

export type IUser = {
  first_name: String;
  last_name: String;
  netid: String;
  school: String;
  year: String;
  curriculum: String;
  college: String;
  courses?: Array<ICourse>;
};

export const User = mongoose.model("User", UserSchema);
export default User;
