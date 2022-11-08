import React from "react";
import { ReactNativeMap } from "./ReactNativeMap";
import { MapDirectionsLegs } from "react-native-maps-directions";
import { Building, ShuttleStop, LatLng } from "../../../types";

interface MapInterface {
  selectedLocation: Building | undefined;
  buildings: Building[];
  origin?: LatLng | undefined;
}

// THIS IS JUST HERE AS AN EXAMPLE FOR KYLE:
// THIS FUNCTION RECIEVES INFORMATION FROM THE ROUTING SERVICE
function ExampleResultHandler(
  results: {
    type: string;
    duration: number;
    distance: number;
    legs: MapDirectionsLegs;
  }[]
) {
  results.forEach((result) => {
    console.log(result.type, result.duration, result.legs.length);
  });
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
      resultHandler={ExampleResultHandler}
    />
  );
};
