import mongoose from "mongoose";

export const BuildingSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  address: {
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
});

export const Building = mongoose.model("Building", BuildingSchema);
export default Building;
