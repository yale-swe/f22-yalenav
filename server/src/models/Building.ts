import mongoose from "mongoose";

const LatLngSchema = new mongoose.Schema({
  latitude: {
    type: "number",
    required: true,
  },
  longitude: {
    type: "number",
    required: true,
  },
});

const BuildingSchema = new mongoose.Schema({
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

export type LatLng = mongoose.Document & {
  longitude: number;
  latitude: number;
};

export type Building = mongoose.Document & {
  name: string;
  abbreviation: string;
  reference: string;
  address: string;
  coords: LatLng;
  tile: LatLng[];
};

export const Building = mongoose.model<Building>("Building", BuildingSchema);
export default Building;
