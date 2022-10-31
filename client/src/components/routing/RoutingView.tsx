import React from "react";
import MapViewDirections from "react-native-maps-directions";
import { Location } from "../../../types";
import { APIKEY, YALE_HEX } from "../../constants";

// routes between locations using specified mode
interface RoutingInterface {
    routeOrigin: Location;
    routeDestination : Location;
    mode?: String | undefined;
    resultHandler?: Function | undefined;
  }
  
  export const RoutingView: React.FC<RoutingInterface> = ({
    routeDestination: routeDestination, mode, 
      routeOrigin: routeOrigin, resultHandler: resultHandler
  }: RoutingInterface) => {
     
    // UI customizability can be added in here; whether you want
    // the lines to be thicker, a certain color, etc

    return (
      <MapViewDirections 
        origin={routeOrigin}
        destination={routeDestination}
        apikey={APIKEY}
        strokeColor={YALE_HEX}
        strokeWidth={4}
        onReady = {result => {
          resultHandler && resultHandler(result.duration, result.distance);
        }}
        />
    );
  };  