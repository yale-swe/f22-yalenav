import React, { useEffect, useState } from "react";
import { Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { LatLng, Results } from "../../../types";
import { APIKEY } from "../../constants";
import { getShuttleRouteBetween, RoutingMode } from "../../utils";

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

  const [isShuttleRoute, setIsShuttleRoute] = useState<boolean>(
    mode == RoutingMode.shuttle
  );
  const [route, setRoute] = useState<any>(undefined);

  useEffect(() => {
    const handleShuttleRoute = async () => {
      let res = await getShuttleRouteBetween(routeOrigin, routeDestination);
      console.log(res);
      setRoute(res);
    };
    setIsShuttleRoute(mode == RoutingMode.shuttle);
    if (isShuttleRoute) handleShuttleRoute();
    else setRoute(undefined);
  }, [mode]);

  let results: Array<Results> = [];

  return (
    <>
      {(!isShuttleRoute || !route) && (
        <MapViewDirections
          origin={routeOrigin}
          destination={routeDestination}
          apikey={APIKEY}
          strokeColor="#FF0000"
          strokeWidth={4}
          mode={mode == RoutingMode.biking ? "BICYCLING" : "WALKING"}
          onReady={(result) => {
            resultHandler &&
              results.push({
                step: 0,
                type: mode == RoutingMode.biking ? "BICYCLING" : "WALKING",
                duration: result.duration,
                distance: result.distance,
                legs: result.legs,
              });
            resultHandler && resultHandler(results);
          }}
        />
      )}
      {isShuttleRoute && route && (
        <>
          <MapViewDirections
            origin={routeOrigin}
            destination={route.startStopCoords}
            apikey={APIKEY}
            strokeColor="#FF0000"
            strokeWidth={4}
            mode={mode == RoutingMode.biking ? "BICYCLING" : "WALKING"}
            onReady={(result) => {
              resultHandler &&
                results.push({
                  step: 0,
                  type: mode == RoutingMode.biking ? "BICYCLING" : "WALKING",
                  duration: result.duration,
                  distance: result.distance,
                  legs: result.legs,
                });
              console.log(`Plain result:`, result);
              resultHandler && resultHandler(results);
            }}
          />
          <Polyline
            coordinates={route.routeCoords} // Plot the bus route here!
            strokeColor="#808080"
            strokeWidth={4}
            onLayout={(_layout) => {
              resultHandler &&
                results.push({
                  step: 1,
                  type: "SHUTTLE",
                  routeName: route.routeName,
                  duration: route.duration,
                  distance: 0,
                });
            }}
          />
          <MapViewDirections
            origin={route.endStopCoords}
            destination={routeDestination}
            strokeColor="#FF0000"
            strokeWidth={4}
            apikey={APIKEY}
            mode={"WALKING"} // if it's a shuttle route, it must be walking
            onReady={(result) => {
              resultHandler &&
                results.push({
                  step: 2,
                  type: "WALKING",
                  duration: result.duration,
                  distance: result.distance,
                  legs: result.legs,
                });
            }}
          />
        </>
      )}
    </>
  );
};
export default RoutingView;
