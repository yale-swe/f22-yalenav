import axios from "axios";
import { LatLng, ShuttleStop } from "../../types";
import { BACKEND } from "../constants";

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
      return [];
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
      //   let bus_id = response.data.etas[origStop][0].bus_id;
      if (!Array(response.data.etas).length) return 15;

      const origStopEtas = response.data.etas[origStop.id];
      if (
        origStopEtas == undefined ||
        origStopEtas[0] == undefined ||
        origStopEtas[0].bus_id
      )
        return 15;

      const busId = origStopEtas[0].bus_id;

      const endStopEtas = response.data.etas[endStop.id];

      const busIdEndStopArrival = endStopEtas.filter((eta: any) => {
        return eta.bus_id != busId;
      });

      // The bus we're getting on takes us all the way there
      if (busIdEndStopArrival.length) {
        return busIdEndStopArrival[0].avg - origStopEtas[0].avg;
      }

      // Temporary: if we have to switch bus, assume whole ride is 15 mins
      return 15;
    })
    .catch((err) => {
      console.log(err);
      return 15;
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
      let duration = await getRideInfoBetween(
        route.id,
        closestToOrigin,
        closestToDest,
        stopsOnRoute
      );

      if (duration == undefined) duration = 15;

      // get coordiantes of entire shuttle route
      const completeRoutePath = formatPath(route.path);

      return {
        startStopCoords: {
          latitude: closestToOrigin.lat,
          longitude: closestToOrigin.lon,
        },
        endStopCoords: {
          latitude: closestToDest.lat,
          longitude: closestToDest.lon,
        },
        routeCoords: completeRoutePath, // to change (cuurently, whole route. want, part of route)
        duration: duration, // assume 15 or so mins for all
        routeName: route.name,
      };
    });

  const sortedRoutes = possibleRoutes.sort((info: any) => {
    return info.duration;
  });
  // return shortest
  return sortedRoutes[0];
};

// Algorithm for computing disance between two points taken from: https://www.geeksforgeeks.org/program-distance-two-points-earth/
const computeDistance = (loc1: LatLng, loc2: LatLng): number => {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.

  let lon1 = (loc1.longitude * Math.PI) / 180;
  let lon2 = (loc2.longitude * Math.PI) / 180;
  let lat1 = (loc2.latitude * Math.PI) / 180;
  let lat2 = (loc2.latitude * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 3956;
  return c * r;
};
