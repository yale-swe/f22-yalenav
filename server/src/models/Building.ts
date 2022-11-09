import mongoose from "mongoose";

export const LatLngSchema = new mongoose.Schema({
  latitude: {
    type: "number",
    required: true,
  },
  longitude: {
    type: "number",
    required: true,
  },
});

export const BuildingSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  abbreviation: {
    type: "string",
    required: true,
  },
  reference: {
    type: "number",
    required: true,
  },
  address: {
    type: "string",
    required: true,
  },
  coords: {
    type: LatLngSchema,
    required: true,
  },
  tile: [
    {
      type: LatLngSchema,
      required: false,
    },
  ],
});

export const Building = mongoose.model("Building", BuildingSchema);
export default Building;
