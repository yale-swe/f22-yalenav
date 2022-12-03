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

  const [route, setRoute] = useState<any>(undefined);

  const [toShuttleRoute, setToShuttleRoute] = useState<Results>();
  const [shuttleRoute, setShuttleRoute] = useState<Results>();
  const [fromShuttleRoute, setFromShuttleRoute] = useState<Results>();

  const [walkRoute, setWalkRoute] = useState<Results>();

  useEffect(() => {
    const isShuttleRoute = mode == RoutingMode.shuttle;
    const handleShuttleRoute = async () => {
      let res = await getShuttleRouteBetween(routeOrigin, routeDestination);
      setRoute(res);
    };
    if (isShuttleRoute == true && resultHandler) {
      handleShuttleRoute();
      if (toShuttleRoute && shuttleRoute && fromShuttleRoute)
        resultHandler([toShuttleRoute, shuttleRoute, fromShuttleRoute]);
    } else if (resultHandler && walkRoute) {
      setRoute(undefined);
      resultHandler([walkRoute]);
    }
  }, [mode]);

  return (
    <>
      {(!(mode == RoutingMode.shuttle) || !route) && (
        <MapViewDirections
          origin={routeOrigin}
          destination={routeDestination}
          apikey={APIKEY}
          strokeColor="#FF0000"
          strokeWidth={4}
          mode={mode == RoutingMode.biking ? "BICYCLING" : "WALKING"}
          onReady={(result) => {
            setWalkRoute({
              step: 0,
              type: mode == RoutingMode.biking ? "BICYCLING" : "WALKING",
              duration: result.duration,
              distance: result.distance,
              legs: result.legs,
            });
          }}
        />
      )}
      {mode == RoutingMode.shuttle && route && (
        <>
          <MapViewDirections
            origin={routeOrigin}
            destination={route.startStopCoords}
            apikey={APIKEY}
            strokeColor="#FF0000"
            strokeWidth={4}
            mode={"WALKING"}
            onReady={(result) => {
              setToShuttleRoute({
                step: 0,
                type: "WALKING",
                duration: result.duration,
                distance: result.distance,
                legs: result.legs,
              });
            }}
          />
          <Polyline
            coordinates={route.routeCoords} // Plot the bus route here!
            strokeColor="#808080"
            strokeWidth={4}
            onLayout={(_layout) => {
              setShuttleRoute({
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
              setFromShuttleRoute({
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
