import React from "react";
import { ReactNativeMap } from "./ReactNativeMap";
import { Building, ShuttleStop, Location } from "../../../types";

interface MapInterface {
  selectedLocation: Building | undefined;
  destination: Building | ShuttleStop | undefined;
  origin: Location | undefined;
}

// Layer of abstraction to render the map from nodule of our chooising
export const Map: React.FC<MapInterface> = ({
  selectedLocation, destination, origin
}: MapInterface) => {
  return <ReactNativeMap selectedLocation={selectedLocation} 
  destination={destination} origin={origin} />;
};
