import React from "react";
import { ReactNativeMap } from "./ReactNativeMap";
import { Building, ShuttleStop, Location } from "../../../types";

interface MapInterface {
  selectedLocation: Building | undefined;
  destination: Building | ShuttleStop | undefined;
  origin: Location | undefined;
  resultHandler: Function | undefined;
}

// THIS IS JUST HERE AS AN EXAMPLE FOR KYLE:
// THIS FUNCTION RECIEVES INFORMATION FROM THE ROUTING SERVICE
function ExampleResultHandler(results : {type: string, duration: number, distance: number}[]) {
  
  results.forEach(result => {
    console.log(result.type, result.duration);
  });
}

// Layer of abstraction to render the map from nodule of our chooising
export const Map: React.FC<MapInterface> = ({
  selectedLocation, destination, origin, resultHandler
}: MapInterface) => {

  return <ReactNativeMap selectedLocation={selectedLocation} 
  destination={destination} origin={origin} resultHandler={resultHandler} />;
};
