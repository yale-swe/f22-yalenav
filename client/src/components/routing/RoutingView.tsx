import React from "react";
import MapViewDirections, { MapViewDirectionsMode } from "react-native-maps-directions";
import { Location } from "../../../types";
import { APIKEY, YALE_HEX } from "../../constants";

export const enum RoutingMode {
  walking,
  biking,
  shuttle
};

function getClosestShuttleStop(x : Location) {
  

  
  return {};
};

// routes between locations using specified mode
interface RoutingInterface {
    routeOrigin: Location;
    routeDestination : Location;
    mode?: RoutingMode | undefined;
    resultHandler?: Function | undefined;
  }
  
  export const RoutingView: React.FC<RoutingInterface> = ({
    routeDestination: routeDestination, mode, 
      routeOrigin: routeOrigin, resultHandler: resultHandler
  }: RoutingInterface) => {
     
    // UI customizability can be added in here; whether you want
    // the lines to be thicker, a certain color, etc
    
    // TODO: implement mode switching
    // Include bycicles, walking, and custom mode for routing.
    ///////////////////////////////////////////////////////////
    /*
    let m = "";
    switch (mode) {
      case RoutingMode.walking:
        m = "WALKING";
        break;
      case RoutingMode.biking:
        m = "BIKING";
        break;
      case RoutingMode.shuttle:
        m = "WALKING";
        routeDestination = getClosestShuttleStop(origin);
        break;
    }*/
    ////////////////////////////////////////////////////////////


    return (
      <MapViewDirections 
        origin={routeOrigin}
        destination={routeDestination}
        apikey={APIKEY}
        strokeColor={YALE_HEX}
        strokeWidth={4}
        mode={"WALKING"}
        onReady = {result => {
          resultHandler && resultHandler(result.duration, result.distance);
        }}
        />
    );
  };  