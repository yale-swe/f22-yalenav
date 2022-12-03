import React, { Component, useEffect, useState } from "react";
import { Polyline } from "react-native-maps";
import MapViewDirections, { MapDirectionsLegs}
 from "react-native-maps-directions";
import axios from "axios";
import { Building, LatLng, Results, ShuttleStop } from "../../../types";
import { APIKEY, BACKEND, YALE_HEX } from "../../constants";
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
  let noneStop : ShuttleStop = { id: -1, lat: 0.0, lon: 0.0, name: ""};

  let [useShuttle, setUseShuttle] = useState<boolean>(mode == RoutingMode.shuttle);
  let [shuttleInfo, setShuttleInfo] = useState<{
    timeUntilStart: number, duration: number, originStop: ShuttleStop, destStop: ShuttleStop
  }>({timeUntilStart: -1.0, duration: -1.0, originStop: noneStop, destStop: noneStop});


  function shuttleCallback(shouldUseShuttle : boolean, 
    tshuttleInfo : {timeUntilStart: number, duration: number, originStop: ShuttleStop, destStop: ShuttleStop}) {

    setUseShuttle(shouldUseShuttle);
    setShuttleInfo(tshuttleInfo);


    return;
  }

  // function RideInfoCallback(info : {duration: number,
  // distance: number, bus_id: number}) {
    
  //   setRideInfo(info);
    
  //   results.push({
  //     type: "SHUTTLE",
  //     duration: info.duration,
  //     distance: info.distance,
  //   });
  //   }

  // function callbackFunction(oS : ShuttleStop, dS : ShuttleStop, routeID : number,
  //    routeLocs : Array<number>, altOriginStation : ShuttleStop, altDestStation : ShuttleStop) {
        
  //     // console.log(oS, dS);
  //     if (!dS || !oS || routeID == -1) {
  //       isShuttleRoute = false;
  //       return;
  //     } 

  //       setOrigin(oS);
  //       setDest(dS);
  //       // setRouteID(routeID);

  //       let locsArr = Array<LatLng>(Math.floor(routeLocations.length / 2));
  //       for (let i = 0; i < routeLocations.length; i += 2)
  //         locsArr[Math.floor(i / 2)] = {latitude: routeLocs[i], longitude: routeLocs[i + 1]};
        
  //       // useEffect(() => {
  //         setLocations(locsArr);
  //       // }, []);

  //       getRideInfoBetween(routeID, oS.id, dS.id, RideInfoCallback);

  //       return;
  //     // Use the second-closest locations as alternatives -- for example, if you're
  //     // in Morse and request the closest stop, you might get the PWG one. Maybe you want 
  // }

  return <ShuttleRouteView 
      routeOrigin={routeOrigin}
      routeDestination={routeDestination}
      callback={shuttleCallback}
    />
  // Return a SECOND polyline -- do:

  // Polyline 1: FULL BUS ROUTE
  // slightly translucent! It's not the route you're taking, but it shows the full route of the bus
  
  // Polyline 2 -- over Polyline 1: THE ROUTE YOU'RE TAKING, start stop to end
  // Full color! You'll be on the bus along this route.

  // Also find a way to display where the bus is along the route!! Use a box or something. Do it.
  // It'll make things easier! 
  // And make sure to keep them updated on the amount of time unitl the thing comes.

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  let RoutingViews = (
    <>
      <MapViewDirections
        origin={routeOrigin}
        destination={isShuttleRoute ? locFromStop(originStop) : routeDestination}
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

      {isShuttleRoute && (
        <Polyline
          coordinates={routePath} // Plot the bus route here!
          onLayout={(layout) => {
            resultHandler &&
              results.push({
                type: "SHUTTLE",
                duration: rideInfo.duration,
                distance: rideInfo.distance,
              });
          }}
        />
      )}

      {isShuttleRoute && (
        <MapViewDirections
          origin={locFromStop(destStop)}
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
