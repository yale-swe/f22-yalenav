import React, { Component, useEffect } from "react";
import { Polyline } from "react-native-maps";
import MapViewDirections, { MapDirectionsLegs}
 from "react-native-maps-directions";
import axios from "axios";
import { LatLng, Results, ShuttleStop } from "../../../types";
import { APIKEY, BACKEND, YALE_HEX } from "../../constants";

export const enum RoutingMode {
  shuttle,
  walkonly,
  biking,
};

function absDistance(lat1 : number, lon1 : number,
     lat2 : number, lon2 : number) {
  return Math.abs(lat1 - lat2) + Math.abs(lon1 - lon2);
}

let shuttlestops = Array<ShuttleStop>();

function getClosestShuttleStop(x: LatLng) {
  // TODO
  // query database for stops
  if (shuttlestops.length == 0)
    useEffect(
      () => {
      axios
        .get<{ shuttlestops: ShuttleStop[] }>(`${BACKEND}/building`)
        .then((res) => {
          shuttlestops = res.data.shuttlestops;
        })
        .catch((err) => {
          console.log(err);
        });
    }, [BACKEND]);
  
  let closestStop : ShuttleStop = { _id: -1, lat: 0.0, lon: 0.0, name: ""};
  let minDist = Infinity;
  shuttlestops.forEach(stop => {
    let curDist = absDistance(stop.lat, stop.lon, x.latitude, x.longitude);
    if (curDist < minDist) {
      minDist = curDist;
      closestStop = stop;
    }
  });

  return closestStop;
}

function getShuttleRouteBetween(origStop: Number, endStop: Number) {
  // TODO
  // Query DoubleMap API
  axios.get("https://yaleshuttle.doublemap.com/map/v2/eta", 
    {params: [{'stop':'1'}]});


  return [];
}

function getRideInfoBetween(origStop: Number, endStop: Number) {

  
  return { duration: 0.0, distance: 0.0, bus_id: 0 };
}

function locFromStop(stop : ShuttleStop) {
  return {latitude: stop.lat, longitude: stop.lon};
}

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
  // UI customizability can be added in here; whether you want
  // the lines to be thicker, a certain color, etc

  let isShuttleRoute = mode == RoutingMode.shuttle;
  let originStop = getClosestShuttleStop(routeOrigin);
  let destStop = getClosestShuttleStop(routeDestination);

  if (originStop._id == destStop._id)
    // closest 
    isShuttleRoute = false;

  let rideInfo = getRideInfoBetween(originStop._id, destStop._id);
  let lines = getShuttleRouteBetween(originStop._id, destStop._id, rideInfo.bus_id);

  // if (shuttleEnd - shuttleStart < 0) {
  //   isShuttleRoute = false;
  // }

  let results: Array<Results> = [];

  // TODO: implement mode switching
  // Include bycicles, walking, and custom mode for routing.
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
          coordinates={[]} // Plot the bus route here!
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
