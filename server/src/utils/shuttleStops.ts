import request from "request";
import { ShuttleStop } from "../models";
import { capitalizeWords } from "./general";

// From the guide here:
// https://data.bloomington.in.gov/dataset/
// 4186d8e2-c8db-4c2f-95d2-efe9ffa6dfcd/resource
// /72e98db0-b6df-4260-82f9-18cc0ecff4ff/download/
// doublemap-application-programming-interface-api-3.pdf
interface ShuttleStopObj {
  id: Number;
  name: String;
  description: String;
  lat?: Number;
  lon?: Number;
  buddy?: String;
  fields?: String;
}

const SHUTTLESTOPENDPOINT = "https://yaleshuttle.doublemap.com/map/v2/stops";

export const getStops = async (): Promise<typeof ShuttleStop[]> => {
  // https://stackoverflow.com/questions/8515872/simple-api-calls-with-node-js-and-express
  return new Promise((resolve, _reject) => {
    request(SHUTTLESTOPENDPOINT, async (err, response, body) => {
      //parse the response based in interface
      let stopList: ShuttleStopObj[] = JSON.parse(body);
      let stops: typeof ShuttleStop[] = formatStops(stopList);
      resolve(stops);
    });
  });
};

// from BuildingsV2 format to Mongoose format
const formatStops = (stopList: ShuttleStopObj[]): typeof ShuttleStop[] => {
  return stopList
    .filter((s: ShuttleStopObj) => {
      // ensure all have a latitude and longitude
      return s.name && s.id && s.lat && s.lon;
    })
    .map((s: ShuttleStopObj) => formatStop(s));
};

const formatStop = (stop: ShuttleStopObj): any => {
  return new ShuttleStop({
    name: capitalizeWords(stop.name),
    lat: stop.lat,
    lon: stop.lon,
    id: stop.id,
  });
};
