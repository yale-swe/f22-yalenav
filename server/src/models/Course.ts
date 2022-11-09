import mongoose from "mongoose";

export const CourseSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
  },
  course_code: {
    type: "string",
    required: true,
  },
  locations_summary: {
    type: "string",
    required: true,
  },
  times_by_day: {
    type: { name: "string", dic: {} },
  },
});

export const Course = mongoose.model("Course", CourseSchema);
export default Course;
