import { ShuttleStop } from "../models";
import request from "request";
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
  latitude?: Number;
  longitude?: Number;
  buddy?: String;
  fields?: String;
}

const SHUTTLESTOPENDPOINT = 'https://yaleshuttle.doublemap.com/map/v2/stops';

export const getStops = async (): Promise<typeof ShuttleStop[]> => {
  // https://stackoverflow.com/questions/8515872/simple-api-calls-with-node-js-and-express
  return new Promise((resolve, reject) => {
    request(SHUTTLESTOPENDPOINT, async (err, response, body) => {
      if (err || response.statusCode !== 200) reject(err);

      //parse the response based in interface
      let stopList: ShuttleStopObj[] =
        JSON.parse(body).ServiceResponse.Buildings;

      // convert each buildings into Building instances
      let buildings: typeof ShuttleStop[] = formatStops(stopList);

      resolve(buildings);
    });
  });
};

// from BuildingsV2 format to Mongoose format
const formatStops = (
  stopList: ShuttleStopObj[]
): typeof ShuttleStop[] => {
  return stopList
    .filter((s: ShuttleStopObj) => {
      // ensure all have a latitude and longitude
      return s.name && s.latitude && s.longitude;
    })
    .map((s: ShuttleStopObj) => formatStop(s));
};

const formatStop = (stop: ShuttleStopObj): typeof ShuttleStop => {
  return new ShuttleStop({
    name: capitalizeWords(stop.name),
    lat: stop.latitude,
    lon: stop.longitude,
    id: stop.id
  });
};
