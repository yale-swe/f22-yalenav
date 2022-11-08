export type LatLng = {
  latitude: number;
  longitude: number;
};

export type Building = {
  _id: string;
  name: string;
  address: string;
  abbreviation: string;
  coords: LatLng;
  tile: LatLng[];
};

export type ShuttleStop = {
  _id: number;
  name: string;
  lat: number;
  lon: number;
};

export type AuthData = {
  netId: string;
};
