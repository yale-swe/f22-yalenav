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

export type AuthData = {
  netId: string;
};
