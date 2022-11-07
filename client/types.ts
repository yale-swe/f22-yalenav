export type Location = {
  latitude: number;
  longitude: number;
};

export type Building = {
  _id: string;
  name: string;
  address: string;
  abbreviation: string;
  lat: number;
  lon: number;
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
