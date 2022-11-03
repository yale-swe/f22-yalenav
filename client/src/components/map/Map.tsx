import React from "react";
import { ReactNativeMap } from "./ReactNativeMap";
import { Building } from "../../../types";

interface MapInterface {
  selectedLocation: Building | undefined;
  buildings: Building[];
}

// Layer of abstraction to render the map from nodule of our chooising
export const Map: React.FC<MapInterface> = ({
  selectedLocation,
  buildings,
}: MapInterface) => {
  return (
    <ReactNativeMap selectedLocation={selectedLocation} buildings={buildings} />
  );
};
