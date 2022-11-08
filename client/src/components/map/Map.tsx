import React from "react";
import { ReactNativeMap } from "./ReactNativeMap";
import { MapDirectionsLegs } from "react-native-maps-directions";
import { Building, ShuttleStop, Location } from "../../../types";

interface MapInterface {
  selectedLocation: Building | undefined;
  origin?: Location | undefined;
}

// Layer of abstraction to render the map from nodule of our chooising
export const Map: React.FC<MapInterface> = ({
  selectedLocation,
  origin,
}: MapInterface) => {
  return <ReactNativeMap selectedLocation={selectedLocation} origin={origin} />;
};
