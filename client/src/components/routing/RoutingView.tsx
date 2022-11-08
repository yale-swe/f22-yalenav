import React, { Component } from "react";
import { Polyline } from "react-native-maps";
import MapViewDirections, {
  MapDirectionsLegs,
} from "react-native-maps-directions";

import { Location } from "../../../types";
import { APIKEY, YALE_HEX } from "../../constants";

export const enum RoutingMode {
  shuttle,
  noshuttle,
  biking,
}

function getClosestShuttleStop(x: Location) {
  // TODO
  // query database for stops

  return { stop: -1, loc: { longitude: 0.0, latitude: 0.0 } };
}

function getShuttleRouteBetween(origStop: Number, endStop: Number) {
  // TODO
  // Query DoubleMap API
  //

  return [];
}

function getRideInfoBetween(origStop: Number, endStop: Number) {
  return { duration: 0.0, distance: 0.0 };
}

// routes between locations using specified mode
interface RoutingInterface {
  routeOrigin: Location;
  routeDestination: Location;
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
  let lines = getShuttleRouteBetween(originStop.stop, destStop.stop);
  let rideInfo = getRideInfoBetween(originStop.stop, destStop.stop);

  // if (shuttleEnd - shuttleStart < 0) {
  //   isShuttleRoute = false;
  // }

  let results: {
    type: string;
    duration: number;
    distance: number;
    legs?: MapDirectionsLegs;
  }[] = [];

  // TODO: implement mode switching
  // Include bycicles, walking, and custom mode for routing.
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  let RoutingViews = (
    <>
      <MapViewDirections

        origin={routeOrigin}
        destination={isShuttleRoute ? originStop.loc : routeDestination}
        apikey={APIKEY}
        strokeColor={YALE_HEX}
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

          // resultHandler && resultHandler(result.duration, result.distance);
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
          origin={destStop.loc}
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

  // Calls the result handler with the information; presented in
  // [{type, duration, distance}, {...}, ...]
  resultHandler && resultHandler(results);

  return RoutingViews; // (
  //   <Component>
  //     <MapViewDirections
  //     origin={routeOrigin}
  //     destination={(isShuttleRoute) ? dest1 : routeDestination}
  //     apikey={APIKEY}
  //     strokeColor={YALE_HEX}
  //     strokeWidth={4}
  //     mode={(mode == RoutingMode.biking) ? "BICYCLING" : "WALKING"}
  //     onReady = {result => {
  //       resultHandler && resultHandler(result.duration, result.distance);
  //     }}/>

  //     {isShuttleRoute && <Polyline
  //       coordinates={[]} // Plot the bus route here!

  //     />}

  //     {isShuttleRoute && <MapViewDirections
  //       origin={orig2}
  //       destination={routeDestination}
  //       apikey={APIKEY}
  //       mode={(mode == RoutingMode.biking) ? "BICYCLING" : "WALKING"}
  //       onReady = {result => {
  //         resultHandler && resultHandler(result.duration, result.distance);
  //       }}
  //     />}

  //   </Component>
  // );
};

