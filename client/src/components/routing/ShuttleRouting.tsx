import React, { Component, useEffect } from "react";
import { Polyline } from "react-native-maps";
import MapViewDirections, { MapDirectionsLegs}
 from "react-native-maps-directions";
import axios from "axios";
import { LatLng, Results, ShuttleStop } from "../../../types";
import { APIKEY, BACKEND, YALE_HEX } from "../../constants";

function locFromStop(stop : ShuttleStop) {
    return {latitude: stop.lat, longitude: stop.lon};
  }
  
  function absDistance(loc1 : LatLng, loc2 : LatLng) {
  return Math.abs(loc1.latitude - loc2.latitude) + Math.abs(loc1.longitude - loc2.longitude);
  }
  
  const NUM_SEARCH_STOPS = 5; // The number of stops to look through;
  // for example, explores the 5 closest stops
  let shuttlestops = new Map<Number, ShuttleStop>();
  
  function checkStops() {
    if (shuttlestops.size == 0)
      useEffect(
        () => {
        axios
          .get<{ shuttlestops: ShuttleStop[] }>(`${BACKEND}/shuttlestop`)
          .then((res) => {
            // shuttlestops = res.data.shuttlestops;
            res.data.shuttlestops.forEach(stop => {
              shuttlestops.set(stop._id, stop);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }, [BACKEND]);
  }
  
  function getClosestShuttleStops(x: LatLng) {
    // TODO
    // query database for stops
    checkStops();
  
    let closestStops = new Array<ShuttleStop>(NUM_SEARCH_STOPS); // length 5
    let closestStopIDs = new Array<Number>(NUM_SEARCH_STOPS); // length 5
  
    for (let i = 0; i < NUM_SEARCH_STOPS; ++i) {
      let closestStop : ShuttleStop = { _id: -1, lat: 0.0, lon: 0.0, name: ""};
      let minDist = Infinity;
      
      shuttlestops.forEach(stop => {
        
        if (!closestStopIDs.includes(stop._id)) {
  
          let curDist = absDistance(locFromStop(stop), x);
          if (curDist < minDist) {
            minDist = curDist;
            closestStop = stop;
          }
        }
      });
  
      closestStops[i] = closestStop;
      closestStopIDs[i] = closestStop._id;
    }
  
    return closestStops;
  }
  
  
  function getShuttleRoute(origLoc : LatLng, endLoc : LatLng) {
    // let origStop : ShuttleStop = { _id: -1, lat: 0.0, lon: 0.0, name: ""};
    // let destStop : ShuttleStop = { _id: -1, lat: 0.0, lon: 0.0, name: ""};
    let origStop = -1;
    let destStop = -1;
    let routeId = -1;
    let routeLocations : number[] = [];
  
    // make sure stops are loaded
    checkStops();
  
    axios.get('https://yaleshuttle.doublemap.com/map/v2/routes')
    .then(function (response) {
      
      let minTotDist = Infinity;
  
      response.data.routes.forEach(function 
        (route : {id : number, path : number[], stops: number[]}) {
        let minToDest = Infinity;
        let minToOrig = Infinity;
        let tOrigStop = -1;
        let tDestStop = -1;
        
        // gets closest two points to orig, dest, respectively, on route
        route.stops.forEach(function (stop_id : number) {
          let stop = shuttlestops.get(stop_id);
  
          if (stop) {
            let toOrig = absDistance(locFromStop(stop), origLoc);
            let toDest = absDistance(locFromStop(stop), endLoc);
  
            if (toDest < minToDest) {
              minToDest = toDest;
              tDestStop = stop_id;
            } 
  
            if (toOrig < minToOrig) {
              minToOrig = toOrig;
              tOrigStop = stop_id;
  
            }
          }
        });
  
        if (minToDest + minToOrig < minTotDist) {
          minTotDist = minToDest + minToOrig;
  
          routeId = route.id;
          routeLocations = route.path;
          origStop = tOrigStop;
          destStop = tDestStop;
        }
  
      });
    });
  
    let ogS = shuttlestops.get(origStop);
    let dsS = shuttlestops.get(destStop);
    
    // should really never be used, but it fixes the annoying red underline squigglies
    let voidStop : ShuttleStop = { _id: -1, lat: 0.0, lon: 0.0, name: ""};
  
    return {origStop: ogS ? ogS : voidStop, 
            destStop: dsS ? dsS : voidStop, 
            route: routeId,
            routeLocs: routeLocations};
  }
  
  
  function getRideInfoBetween(routeId: number, origStop: number, endStop: number) {
  
    let duration : number = -1;
    let distance: number = -1;
    let bus_id : number = -1;
  
    axios.get('https://yaleshuttle.doublemap.com/map/v2/etas', {
      params: {
        route: routeId
      }
    })
    .then(function (response) {
  
      bus_id = response.data.etas[origStop][0].bus_id;
      duration = response.data.etas[endStop][0].avg - response.data.etas[origStop][0].avg;
  
    });
  
    
    return { duration: duration, distance: 0.0, bus_id: bus_id };
  }
  
  
  // routes between locations using specified mode
  interface ShuttleInterface {
    routeOrigin: LatLng;
    routeDestination: LatLng;
    shuttleStops: ShuttleStop[];
    resultHandler?: Function | undefined;
  }
  
  export const RoutingView: React.FC<ShuttleInterface> = ({
    routeDestination: routeDestination,
    stops : stops,
    routeOrigin: routeOrigin,
    resultHandler: resultHandler,
  }: ShuttleInterface) => {
    // UI customizability can be added in here; whether you want
    // the lines to be thicker, a certain color, etc
  
    
    let {origStop: originStop, destStop: destStop, route: routeId, routeLocs: routeLocations} = 
      getShuttleRoute(routeOrigin, routeDestination);
  
      
    let rideInfo = getRideInfoBetween(routeId, originStop._id, destStop._id);
  
  
    let routePath = Array<LatLng>(Math.floor(routeLocations.length / 2));
    for (let i = 0; i < routeLocations.length; i += 2) {
      routePath[Math.floor(i / 2)] = {latitude: routeLocations[i], longitude: routeLocations[i + 1]};
    }
  
    let results: Array<Results> = [];
  
    // TODO: implement mode switching
    // Include bycicles, walking, and custom mode for routing.
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    return (
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
    );
  
    // // Calls the result handler with the information; presented in
    // // [{type, duration, distance}, {...}, ...]
    // resultHandler && resultHandler(results);
  
  };
  export default ShuttleView;
  