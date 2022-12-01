import React, { Component, useEffect, useState } from "react";
import { Polyline } from "react-native-maps";
import MapViewDirections, { MapDirectionsLegs}
 from "react-native-maps-directions";
import axios from "axios";
import { Building, LatLng, Results, ShuttleStop } from "../../../types";
import { APIKEY, BACKEND, YALE_HEX } from "../../constants";

export const enum RoutingMode {
  shuttle,
  walkonly,
  biking,
};

// function absDistance(lat1 : number, lon1 : number,
//      lat2 : number, lon2 : number) {
//   return Math.abs(lat1 - lat2) + Math.abs(lon1 - lon2);
// }

function locFromStop(stop : ShuttleStop) {
  return {latitude: stop.lat, longitude: stop.lon};
}

function absDistance(loc1 : LatLng, loc2 : LatLng) {
return Math.abs(loc1.latitude - loc2.latitude) + Math.abs(loc1.longitude - loc2.longitude);
}


function getClosestShuttleStops(x: LatLng) {
  // TODO
  // query database for stops
  checkStops();

  let closestStops = new Array<ShuttleStop>(NUM_SEARCH_STOPS); // length 5
  let closestStopIDs = new Array<Number>(NUM_SEARCH_STOPS); // length 5

  for (let i = 0; i < NUM_SEARCH_STOPS; ++i) {
    let closestStop : ShuttleStop = { id: -1, lat: 0.0, lon: 0.0, name: ""};
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
    closestStopIDs[i] = closestStop.id;
  }

  return closestStops;
}


function getShuttleRoute(origLoc : LatLng, endLoc : LatLng, shuttlestops : Map<Number, ShuttleStop>,
  // routes_response : Array<{id : number, path : number[], stops: number[]}>) {
    callback : Function) {
  
    // let origStop : ShuttleStop = { _id: -1, lat: 0.0, lon: 0.0, name: ""};
  // let destStop : ShuttleStop = { _id: -1, lat: 0.0, lon: 0.0, name: ""};
  let origStop = -1;
  let destStop = -1;
  let routeId = -1;
  let routeLocations : number[] = [];
  
  let altOrig = -1;
  let altDest = -1;

  // make sure stops are loaded
  // console.log(shuttlestops);
  if (shuttlestops.size == 0)
      return;
  
  // while (shuttlestops.size == 0);

  axios.get('https://yaleshuttle.doublemap.com/map/v2/routes')
  .then(function (response) {
    
    let minTotDist = Infinity;

    response.data.forEach(function 
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
            
            // second-smallest
            altDest = tDestStop;
            
            tDestStop = stop_id;
          }

          if (toOrig < minToOrig) {
            minToOrig = toOrig;
            
            // second-smallest -- save whatever used to be the smallest
            altOrig = tOrigStop;
            
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

      let ogS = shuttlestops.get(origStop);
      let dsS = shuttlestops.get(destStop);
      
      callback(ogS, dsS, routeId, routeLocations, 
        shuttlestops.get(altOrig), shuttlestops.get(altDest));

    });
  }).catch(err => {
    console.log(err);
  });

  

  let voidStop : ShuttleStop = { id: -1, lat: 0.0, lon: 0.0, name: ""};


  // return {og: ogS ? ogS : voidStop,
  //         ds: dsS ? dsS : voidStop,
  //         rid: routeId,
  //         rl: routeLocations,
  //         aog: shuttlestops.get(altOrig),
  //         ads: shuttlestops.get(altDest)
  //       };
  // });

  
  // should really never be used, but it fixes the annoying red underline squigglies
  // let voidStop : ShuttleStop = { _id: -1, lat: 0.0, lon: 0.0, name: ""};

  // return {origStop: ogS ? ogS : voidStop, 
  //         destStop: dsS ? dsS : voidStop, 
  //         route: routeId,
  //         routeLocs: routeLocations};
}


function getRideInfoBetween(routeId: number, origStop: number, 
            endStop: number, callback : Function) {


  // axios.get('https://yaleshuttle.doublemap.com/map/v2/etas', {
  //   params: {route: routeId}
  // })
  // .then(function (response) {

  //   let bus_id = response.data.etas[origStop][0].bus_id;
  //   let duration = response.data.etas[endStop][0].avg - response.data.etas[origStop][0].avg;
  //   callback({ duration: duration, distance: 0.0, bus_id: bus_id });
  // });
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

  

  let results: Array<Results> = [];
  let [shuttlestops, setStops] = useState(new Map<Number, ShuttleStop>());
  
  // UI customizability can be added in here; whether you want
  // the lines to be thicker, a certain color, etc

  // if (originStop._id == destStop._id)
  //   // closest 
  //   isShuttleRoute = false;

  useEffect(() => {

    // axios.get("http://yaleshuttle.doublemap.com/map/v2/stops/")
    axios
    .get<{shuttlestops : ShuttleStop[]}>(`${BACKEND}/shuttlestop`)
    .then((res) => {
        console.log(res.data.shuttlestops);
        // console.log("we here");
        // let tStops = new Map<Number, ShuttleStop>();
        // res.data.shuttlestops.forEach((stop : Building) => {
        // // res.data.forEach((stop : ShuttleStop) => {
        //     // tStops.set(stop.id, stop);

        //     // console.log(stop);
        // });

        // setStops(tStops);
    })
    .catch((err) => {
      console.log(err);
    });

  }, [BACKEND]);

  console.log(shuttlestops);
  
  // let originStop : ShuttleStop = { _id: -1, lat: 0.0, lon: 0.0, name: ""};
  // let destStop : ShuttleStop = { _id: -1, lat: 0.0, lon: 0.0, name: ""};
  // let routeId : number = -1;
  // let routeLocations : Array<number> = [];

  let [originStop, setOrigin] = useState<ShuttleStop>();
  let [destStop, setDest] = useState<ShuttleStop>(); // { _id: -1, lat: 0.0, lon: 0.0, name: ""};
  let [routeId, setRouteID] = useState<number>(-1);
  let [routeLocations, setLocations] = useState<Array<LatLng>>([]);
  let [rideInfo, setRideInfo] = useState<{duration: number,
     distance: number, bus_id: number}>();


  function RideInfoCallback(info : {duration: number,
  distance: number, bus_id: number}) {
    
    setRideInfo(info);
    
    results.push({
      type: "SHUTTLE",
      duration: info.duration,
      distance: info.distance,
    });
    }

  function callbackFunction(oS : ShuttleStop, dS : ShuttleStop, 
      routeID : number, routeLocs : Array<number>, altOriginStation : ShuttleStop, altDestStation : ShuttleStop) {
        
        setOrigin(oS);
        setDest(dS);
        setRouteID(routeID);

        let locsArr = Array<LatLng>(Math.floor(routeLocations.length / 2));
        for (let i = 0; i < routeLocations.length; i += 2)
          locsArr[Math.floor(i / 2)] = {latitude: routeLocs[i], longitude: routeLocs[i + 1]};
        
        setLocations(locsArr);

        getRideInfoBetween(routeID, oS.id, dS.id, RideInfoCallback);

        // Use the second-closest locations as alternatives -- for example, if you're
        // in Morse and request the closest stop, you might get the PWG one. Maybe you want 
  }


  
  
  // let origStopID = -1;
  // let destStopID = -1;
  // let routeId = -1;
  // let routeLocations : number[] = [];

  
    //   let x = getShuttleRoute(routeOrigin, routeDestination, );

    //   console.log(x);

    //   originStop = x.og;
    //   destStop = x.ds;
    //   routeId = x.rid;
    //   routeLocations = x.rl;
    // }).catch((err) => {
    //   console.log(err);
    // });
      //  originStop = x[]
  
  // let {origStop: originStop, destStop: destStop, route: routeId, routeLocs: routeLocations} =
  
  // getShuttleRoute(routeOrigin, routeDestination, callbackFunction);
  useEffect(() => getShuttleRoute(routeOrigin, routeDestination, shuttlestops, callbackFunction));

    
  // let rideInfo = getRideInfoBetween(routeId, originStop._id, destStop._id);

  let isShuttleRoute = mode == RoutingMode.shuttle && 
        originStop && destStop && routeId >= 0;

  isShuttleRoute = true;
  
  
  
  console.log(shuttlestops);
  // console.log(shuttlestops);

  return <Polyline
  coordinates={routeLocations} // Plot the bus route here!
  strokeWidth={4}/>;

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
