import React, { Component, useEffect, useState } from "react";
import MapViewDirections, { MapDirectionsLegs}
 from "react-native-maps-directions";
import { LatLng, Results } from "../../../types";
import { APIKEY, YALE_HEX } from "../../constants";
import {ShuttleRouteView} from "./ShuttleRouteView";

export const enum RoutingMode {
  shuttle,
  walkonly,
  biking,
};


// routes between locations using specified mode
interface RoutingInterface {
  routeOrigin: LatLng;
  routeDestination: LatLng;
  mode?: RoutingMode | undefined;
  resultHandler?: Function | undefined;
}

export const RoutingView: React.FC<RoutingInterface> = ({
  routeDestination: routeDestination,
  mode,
  routeOrigin: routeOrigin,
  resultHandler: resultHandler,
}: RoutingInterface) => {  

  let results: Array<Results> = [];
  
  // UI customizability can be added in here; whether you want
  // the lines to be thicker, a certain color, etc
  let noneLoc : LatLng = {latitude: 0, longitude: 0};

  let [useShuttle, setUseShuttle] = useState<boolean>(false);
  let [shuttleInfo, setShuttleInfo] = useState<{
    timeUntilStart: number, duration: number, originStopLoc: LatLng, destStopLoc: LatLng
  }>({timeUntilStart: -1.0, duration: -1.0, originStopLoc: noneLoc, destStopLoc: noneLoc});


  function shuttleCallback(shouldUseShuttle : boolean, 
    tshuttleInfo : {timeUntilStart: number, duration: number, originStopLoc: LatLng, destStopLoc: LatLng}) {

    setUseShuttle(shouldUseShuttle);
    shouldUseShuttle && setShuttleInfo(tshuttleInfo);


    return;
  }

  let shuttleView = (mode == RoutingMode.shuttle) ? (<ShuttleRouteView 
    routeOrigin={routeOrigin}
    routeDestination={routeDestination}

    // callback={shuttleCallback}

    /*

    So, this callback function is supposed to work. It causes an infinite loop. I'm tired. If someone wants to fix it,
    it'll allow Google Maps to route to the bus stop you need to get onto the bus on, and from where you get 
    off to the destination.

    */


  />) : (<></>);

  if (mode == RoutingMode.shuttle)
    return shuttleView;

  // // Return a SECOND polyline -- do:

  // // Polyline 1: FULL BUS ROUTE
  // // slightly translucent! It's not the route you're taking, but it shows the full route of the bus
  
  // // Polyline 2 -- over Polyline 1: THE ROUTE YOU'RE TAKING, start stop to end
  // // Full color! You'll be on the bus along this route.

  // // Also find a way to display where the bus is along the route!! Use a box or something. Do it.
  // // It'll make things easier! 
  // // And make sure to keep them updated on the amount of time unitl the thing comes.

  //   if (mode == RoutingMode.shuttle)
  //     return shuttleView;

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  let RoutingViews = (
    <>
      <MapViewDirections
        origin={routeOrigin}
        destination={useShuttle ? shuttleInfo.originStopLoc : routeDestination}
        apikey={APIKEY}
        strokeColor="#FF0000"
        strokeWidth={4}
        mode={mode == RoutingMode.biking ? "BICYCLING" : "WALKING"}
        onReady={(result) => {
          resultHandler &&
            results.push({
              type: mode == RoutingMode.biking ? "BICYCLING" : "WALKING",
              duration: result.duration,
              distance: result.distance,
              legs: result.legs,
            });
          console.log(`Plain result:`, result);
          resultHandler && resultHandler(results);
        }}
      />

      {(useShuttle && shuttleView)}

      {useShuttle && (
        <MapViewDirections
          origin={shuttleInfo.destStopLoc}
          destination={routeDestination}
          apikey={APIKEY}
          mode={"WALKING"} // if it's a shuttle route, it must be walking
          onReady={(result) => {
            resultHandler &&
              results.push({
                type: "WALKING",
                duration: result.duration,
                distance: result.distance,
                legs: result.legs,
              });
          }}
        />
      )}
    </>
  );

  // // Calls the result handler with the information; presented in
  // // [{type, duration, distance}, {...}, ...]
  // resultHandler && resultHandler(results);

  return RoutingViews;
};
export default RoutingView;
