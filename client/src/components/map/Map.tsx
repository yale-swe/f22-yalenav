import React from "react";
import { ReactNativeMap } from "./ReactNativeMap";
import { MapDirectionsLegs } from "react-native-maps-directions";
import { Building, ShuttleStop, LatLng } from "../../../types";

interface MapInterface {
  selectedLocation: Building | undefined;
  buildings: Building[];
  origin?: LatLng | undefined;
}

// Layer of abstraction to render the map from nodule of our chooising
export const Map: React.FC<MapInterface> = ({
  selectedLocation,
  origin,
  buildings,
}: MapInterface) => {
  return (
    <ReactNativeMap
      selectedLocation={selectedLocation}
      buildings={buildings}
      origin={origin}
    />
  );
};
