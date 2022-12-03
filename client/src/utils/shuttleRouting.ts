import axios from "axios";
import { LatLng, ShuttleStop } from "../../types";
import { BACKEND } from "../constants";
import { computeDistance } from "../utils/general";

export const enum RoutingMode {
  shuttle,
  noshuttle,
  biking,
}

const SHUTTLE_ROUTE_ENDPOINT =
  "https://yaleshuttle.doublemap.com/map/v2/routes";
const SHUTTLE_ETA_ENDPOINT = "https://yaleshuttle.doublemap.com/map/v2/eta";

export const getShuttleRoutes = async () => {
  return axios
    .get(SHUTTLE_ROUTE_ENDPOINT)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getShuttleStops = async () => {
  return axios
    .get<{ stops: ShuttleStop[] }>(`${BACKEND}/shuttlestop`)
    .then((res) => {
      return res.data.stops;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getClosestShuttleStop = async (
  origin: LatLng,
  allStopsOnRoute: ShuttleStop[]
) => {
  // query database for stops
  // get closest stop
  return allStopsOnRoute.sort((a: ShuttleStop, b: ShuttleStop) => {
    let a_delta = computeDistance(origin, {
      latitude: a.lat,
      longitude: a.lon,
    });
    let b_delta = computeDistance(origin, {
      latitude: b.lat,
      longitude: b.lon,
    });
    return a_delta > b_delta ? 1 : -1;
  })[0];
};

export const calculateTravelTime = (
  origStop: ShuttleStop,
  endStop: ShuttleStop,
  allStopsOnRoute: ShuttleStop[]
  // etas: Map<string, any>
) => {
  return allStopsOnRoute.length;
};

// Future Feature...
export const getRideInfoBetween = (
  routeId: number,
  origStop: ShuttleStop,
  endStop: ShuttleStop,
  allStopsOnRoute: ShuttleStop[]
) => {
  return axios
    .get(SHUTTLE_ETA_ENDPOINT, {
      params: {
        route: routeId,
      },
    })
    .then(function (response) {
      return {};
    });
};

export const getClosestLatLng = (origin: LatLng, coords: LatLng[]) => {
  const sortedByProximity = coords.sort((a: LatLng, b: LatLng) => {
    let coord1Delta = computeDistance(origin, a);
    let coord2Delta = computeDistance(origin, b);
    return coord1Delta > coord2Delta ? 1 : -1;
  });
  return sortedByProximity[0];
};

export const formatPath = (path: number[]): LatLng[] => {
  // format: [ 41.297862, -72.926627, 41.29785, ...]

  const slicePath = (path: number[]): number[][] => {
    let res = [];
    for (let i = 0; i < path.length; i += 2) res.push(path.slice(i, i + 2));
    return res;
  };

  return slicePath(path).map((coord: any) => {
    return { latitude: coord[0], longitude: coord[1] };
  });
};

export const getShuttleRouteBetween = async (origin: LatLng, dest: LatLng) => {
  // Query DoubleMap API

  const routes = await getShuttleRoutes();
  const shuttleRoutes = routes;
  // query database for stops
  const shuttleStops = await getShuttleStops();
  if (!shuttleStops) return;

  const possibleRoutes = shuttleRoutes
    .filter((route: any) => {
      return route.active && route.path.length;
    })
    .map(async (route: any) => {
      const allStopsOnRoute = shuttleStops.filter((s: ShuttleStop) => {
        return route.stops.indexOf(s.id);
      });
      const closestToOrigin = await getClosestShuttleStop(
        origin,
        allStopsOnRoute
      );
      const closestToDest = await getClosestShuttleStop(dest, allStopsOnRoute);

      const stopsOnRoute: ShuttleStop[] = [];
      const start = allStopsOnRoute.indexOf(closestToOrigin);
      let currStop = closestToOrigin;
      for (
        let i = 0;
        i < allStopsOnRoute.length && currStop != closestToDest;
        i++
      ) {
        stopsOnRoute.push(currStop);
        currStop = allStopsOnRoute[(start + i) % allStopsOnRoute.length];
      }

      // naive: duration correlates with number of stops
      const duration = calculateTravelTime(
        closestToOrigin,
        closestToDest,
        stopsOnRoute
      );

      // get coordiantes of entire shuttle route
      const completeRoutePath = formatPath(route.path);
      // get index of closest coordinate on route path
      const closestToStart = getClosestLatLng(
        { latitude: closestToOrigin.lat, longitude: closestToOrigin.lon },
        completeRoutePath
      );
      let startCoord = 0;
      for (let i = 0; i < completeRoutePath.length; i++) {
        if (completeRoutePath[i] == closestToStart) startCoord = i;
      }
      const closestToEnd = getClosestLatLng(
        { latitude: closestToDest.lat, longitude: closestToDest.lon },
        completeRoutePath
      );
      let endCoord = 0;
      for (let i = 0; i < completeRoutePath.length; i++) {
        if (completeRoutePath[i] == closestToStart) endCoord = i;
      }

      // get coords along the user's path
      let routePath: LatLng[] = [];
      for (let i = 0; i < completeRoutePath.length; i++) {
        let coord =
          completeRoutePath[(startCoord + i) % completeRoutePath.length];
        if (coord == closestToEnd) break;
        routePath.push(coord);
      }
      return {
        startStopCoords: {
          latitude: closestToOrigin.lat,
          longitude: closestToOrigin.lon,
        },
        endStopCoords: {
          latitude: closestToDest.lat,
          longitude: closestToDest.lon,
        },
        routeCoords: formatPath(route.path), // to change (cuurently, whole route. want, part of route)
        duration: 15, // assume 15 or so mins for all
        routeName: route.name,
      };
    });

  const sortedRoutes = possibleRoutes.sort((info: any) => {
    return info.duration;
  });
  // return shortest
  return sortedRoutes[0];
};
