export type Location = {
  latitude: number;
  longitude: number;
}

export type Building = {
  _id: string;
  name: string;
  address: string;
  abbreviation: string;
  loc : Location;
};

export type ShuttleStop = {
  _id: number;
  name: string;
  loc : Location;
};

export type AuthData = {
  netId: string;
};
