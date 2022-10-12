import React from "react";
import { ReactNativeMap } from "./ReactNativeMap";

interface MapInterface {}

// Layer of abstraction to render the map from nodule of our chooising
export const Map: React.FC<MapInterface> = ({}: MapInterface) => {
  return <ReactNativeMap />;
};
