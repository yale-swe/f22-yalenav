import React from "react";
import { Building, LatLng } from "../../../types";
import { ReactNativeMap } from "./ReactNativeMap";

interface MapInterface {
  selectedLocation: Building | undefined;
  origin?: LatLng | undefined;
  buildings: Building[];
}

// Layer of abstraction to render the map from module of our chooising
export const Map: React.FC<MapInterface> = ({
  selectedLocation,
  origin,
  buildings,
}: MapInterface) => {
  return (
    <ReactNativeMap
      selectedLocation={selectedLocation}
      origin={origin}
      buildings={buildings}
    />
  );
};
