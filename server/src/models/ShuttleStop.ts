import mongoose from "mongoose";

export const ShuttleStopSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  lat: {
    type: "number",
    required: true,
  },
  lon: {
    type: "number",
    required: true,
  },
  id: {
    type: "number",
    required: true,
  },
});

export const ShuttleStop = mongoose.model("ShuttleStop", ShuttleStopSchema);
export default ShuttleStop;
