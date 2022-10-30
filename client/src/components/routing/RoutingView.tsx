import React from "react";
import MapViewDirections from "react-native-maps-directions";
import { Location } from "../../../types";

interface RoutingInterface {
    routeOrigin: Location;
    routeDestination : Location;
    mode?: String | undefined;
  }
  
  export const RoutingView: React.FC<RoutingInterface> = ({
    routeDestination: routeDestination, mode, routeOrigin: routeOrigin
  }: RoutingInterface) => {
  
    // const orig = 
    // const dest = {latitude: routeDestination.lat,
    //    longitude: routeDestination.lon};

    const APIKEY = 'AIzaSyAXXjQ9BSLJ3SwDmJKjaCsgGQv1IiRQ9Q8';
  
    return (
      <MapViewDirections 
        origin={routeOrigin}
        destination={routeDestination}
        apikey={APIKEY}/>
    );
  };  