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

    const APIKEY = 'AIzaSyAaFzpWVbgNHe41BXKM04MGOT6Vf_y7tn0';
  
    return (
      <MapViewDirections 
        origin={routeOrigin}
        destination={routeDestination}
        apikey={APIKEY}/>
    );
  };  