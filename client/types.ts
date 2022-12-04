import { MapDirectionsLegs } from "react-native-maps-directions";

export type LatLng = {
  latitude: number;
  longitude: number;
};

export type Building = {
  _id: string;
  name: string;
  type: string;
  address: string;
  abbreviation: string;
  coords: LatLng;
  tile: LatLng[];
};

export type ShuttleStop = {
  _id: number;
  id: number;
  name: string;
  lat: number;
  lon: number;
};

export type AuthData = {
  netId: string;
};

export type Results = {
  step: number;
  type: string;
  duration: number;
  distance: number;
  routeName?: string;
  legs?: MapDirectionsLegs;
};

export type Course = {
  _id: string;
  title: string;
  course_code: string;
  locations_summary: string;
  schedule: string;
};

export type User = {
  first_name: String;
  last_name: String;
  netid: String;
  school: String;
  year: String;
  curriculum: String;
  college?: String;
  courses?: Course[];
};

export const enum RoutingMode {
  shuttle,
  noshuttle,
  biking,
}
