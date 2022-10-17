import { YALE_BUILDINGS_AUTH } from "../auth";
import { Building } from "../models";
import request from "request";

// https://developers.yale.edu/buildingsv2
interface BuildingsV2Object {
  SITE: String;
  BUILDING: String;
  BUILDING_ABBR: String;
  DESCRIPTION: String;
  USAGE_DESCRIPTION: String;
  ADDRESS_1: String;
  ADDRESS_2: String;
  ADDRESS_3: String;
  STATUS: String;
  HISTORICAL_ALIAS?: String;
  ADDR1_ALIAS?: String;
  MSAG_ALIAS?: String;
  LATITUDE?: Number;
  LONGITUDE?: Number;
}

const BUILDINSV2ENDPOINT = `https://gw.its.yale.edu/soa-gateway/buildings/v2/feed?apikey=${YALE_BUILDINGS_AUTH}&type=json`;

export const getBuildings = async (): Promise<typeof Building[]> => {
  // https://stackoverflow.com/questions/8515872/simple-api-calls-with-node-js-and-express
  return new Promise((resolve, reject) => {
    request(BUILDINSV2ENDPOINT, async (err, response, body) => {
      if (err || response.statusCode !== 200) reject(err);

      //parse the response based in interface
      let buildingsList: BuildingsV2Object[] =
        JSON.parse(body).ServiceResponse.Buildings;

      // convert each buildings into Building instances
      let buildings: typeof Building[] = formatBuildings(buildingsList);

      resolve(buildings);
    });
  });
};

// from BuildingsV2 format to Mongoose format
const formatBuildings = (
  buildingsList: BuildingsV2Object[]
): typeof Building[] => {
  return buildingsList
    .filter((b: BuildingsV2Object) => {
      // ensure all have a latitude and longitude
      return b.DESCRIPTION && b.LATITUDE && b.LONGITUDE;
    })
    .map((b: BuildingsV2Object) => formatBuilding(b));
};

const formatBuilding = (building: BuildingsV2Object): typeof Building => {
  return new Building({
    name: building.DESCRIPTION,
    address: [building.ADDRESS_1, building.ADDRESS_2, building.ADDRESS_3].join(
      ", "
    ),
    lat: building.LATITUDE,
    lon: building.LONGITUDE,
  });
};
