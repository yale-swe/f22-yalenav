import { LatLng } from "react-native-maps";

export interface BuildingTiles {
  [ref: string]: LatLng[];
}

// make a bunch of polygons based on the json
export const getPolygons = (): BuildingTiles => {
  const polygonCoords = require("./polygonCoords.json");
  // map through all locations
  let buildingTiles: BuildingTiles = {};
  polygonCoords.children.locations.map((loc: any): void => {
    // for each location, map through all the coords in path
    const reference = loc.reference[0];
    const polygon = loc.shape.paths.map((pair: Array<number>): LatLng => {
      // turn each pair into LatLng type as per rn
      return {
        latitude: pair[0],
        longitude: pair[1],
      };
    });
    // index into building tiles with ref code
    buildingTiles[reference] = polygon;
  });
  return buildingTiles;
};
