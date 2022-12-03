
import React, { Component, useEffect, useState } from "react";
import { Polyline, Circle } from "react-native-maps";
import axios from "axios";
import { LatLng, Results, ShuttleStop } from "../../../types";
import { BACKEND, YALE_HEX } from "../../constants";

function absDistance(loc1 : LatLng, loc2 : LatLng) {
    return Math.abs(loc1.latitude - loc2.latitude) + Math.abs(loc1.longitude - loc2.longitude);
}

function locFromStop(stop : ShuttleStop) {
    return {latitude: stop.lat, longitude: stop.lon};
}

function getShuttleRoute(origLoc : LatLng, endLoc : LatLng, 
    routes_response : Array<{id : number, path : number[], stops: number[]}>,
    shuttlestops : Map<Number, ShuttleStop>,
    callback : Function) {

    console.log("this function was called");
    
    // let origStop : ShuttleStop = { _id: -1, lat: 0.0, lon: 0.0, name: ""};
    // let destStop : ShuttleStop = { _id: -1, lat: 0.0, lon: 0.0, name: ""};
    let origStop = -1;
    let destStop = -1;
    let routeId = -1;
    let routeLocations : number[] = [];
    
    let altOrig = -1;
    let altDest = -1;

    if (shuttlestops.size == 0) {
    console.log("ShuttleStops not found.");
    return;
    }

    if (routes_response.length == 0) {
        console.log("Routes not found.");
        return;
    }
    
    let minTotDist = Infinity;

    // console.log(routes_response);

    routes_response.forEach(function (route:
        {id : number, path : number[], stops: number[]}) {
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

    // console.log(origStop, destStop);

    let ogS = shuttlestops.get(origStop);
    let dsS = shuttlestops.get(destStop);
    
    callback(ogS, dsS, routeId, routeLocations, 
        shuttlestops.get(altOrig), shuttlestops.get(altDest));

    });
    // }).catch(err => {
    //   console.log(err);
    // });
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
interface ShuttleRouteInterface {
    routeOrigin: LatLng;
    routeDestination: LatLng;
    callback?: Function | undefined;
}
  
  export const ShuttleRouteView: React.FC<ShuttleRouteInterface> = ({
    routeDestination: routeDestination,
    routeOrigin: routeOrigin,
    callback: callback,
  }: ShuttleRouteInterface) => {  
  
    let results: Array<Results> = [];
    let [shuttlestops, setStops] = useState(new Map<Number, ShuttleStop>());
    let [routes, setRoutes] = useState(new Array<{id : number, path : number[], stops: number[]}>());
    
    // UI customizability can be added in here; whether you want
    // the lines to be thicker, a certain color, etc
  
    // if (originStop._id == destStop._id)
    //   // closest 
    //   isShuttleRoute = false;
  
    
  
    useEffect(() => {
      // console.log("route effect goin");
      axios
      .get('https://yaleshuttle.doublemap.com/map/v2/routes')
      .then((res : {data : {id: number, path: number[], active: boolean, stops : number[]}[]}) => {
          setRoutes(res.data.filter(
            (value : {id: number, path: number[], active: boolean, stops: number[]}) => 
                {return value.stops.length > 0 && value.active; 
          }));
      })
      .catch((err) => {
        console.log(err);
      });
    }, []);
  
    // setRoutes([]);
  
    useEffect(() => {
      console.log("shuttlestop effect goin");
      axios
      .get<{stops : ShuttleStop[]}>(`${BACKEND}/shuttlestop`)
      .then((res) => {
          let tStops = new Map<Number, ShuttleStop>();
          res.data.stops.forEach((stop : ShuttleStop) => {
              tStops.set(stop.id, stop);
          });
  
          setStops(tStops);
      })
      .catch((err) => {
        console.log(err);
      });
    }, [BACKEND]);
  
    // let originStop : ShuttleStop = { _id: -1, lat: 0.0, lon: 0.0, name: ""};
    // let destStop : ShuttleStop = { _id: -1, lat: 0.0, lon: 0.0, name: ""};
    // let routeId : number = -1;
    // let routeLocations : Array<number> = [];
  
    let [originStop, setOrigin] = useState<ShuttleStop>({ id: -1, lat: 0.0, lon: 0.0, name: ""});
    let [destStop, setDest] = useState<ShuttleStop>({ id: -1, lat: 0.0, lon: 0.0, name: ""}); 
    let [routeId, setRouteID] = useState<number>(-1);
    let [routeLocations, setLocations] = useState<Array<LatLng>>([]);
    let [fullBusRoute, setFullBusRoute] = useState<Array<LatLng>>([]);

    let [busesCircles, setBusCircles] = useState<Array<LatLng>>([]);
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
  
    function callbackFunction(oS : ShuttleStop, dS : ShuttleStop, routeID : number,
       routeLocs : Array<number>, altOriginStation : ShuttleStop, altDestStation : ShuttleStop) {
          
        // console.log(oS, dS);
        if (!dS || !oS || routeID == -1) {
          return;
        } 

        // console.log(locFromStop(oS));
  
        setOrigin(oS);
        setDest(dS);
        setRouteID(routeID);

        let locsArr = Array<LatLng>(Math.floor(routeLocs.length / 2));
        for (let i = 0; i < routeLocs.length; i += 2) {
            locsArr[Math.floor(i / 2)] = {latitude: routeLocs[i], longitude: routeLocs[i + 1]};
        }

        // useEffect(() => {
        setLocations(locsArr);
        // }, []);
        // console.log(routeLocs);

        getRideInfoBetween(routeID, oS.id, dS.id, RideInfoCallback);

        return;
        // Use the second-closest locations as alternatives -- for example, if you're
        // in Morse and request the closest stop, you might get the PWG one. Maybe you want 
    }
  
    useEffect(() => {
        // console.log(routes.length);
        // console.log(shuttlestops.size);
      getShuttleRoute(routeOrigin, routeDestination, routes, shuttlestops, callbackFunction);
    }, [shuttlestops, routes]); // [routeOrigin, routeDestination]);
    // let rideInfo = getRideInfoBetween(routeId, originStop._id, destStop._id);
  
    useEffect(() => {

        const interval = setInterval(() => {
            axios
            .get('https://yaleshuttle.doublemap.com/map/v2/buses')
            .then((res : {data : {id: number, route: number, lat: number, lon: number}[]}) => {
                let locs = res.data.filter(
                (value : {id: number, route: number, lat: number, lon: number}) => 
                    {return value.route == routeId; 
                });

                
                // console.log(res.data);
                // console.log(locs);

                let l : Array<LatLng> = [];

                locs.forEach((value) => {
                    l.push({latitude: value.lat, longitude: value.lon});
                });

                setBusCircles(l);
            })
            .catch((err) => {
                console.log(err);
            });
        }, 1000);

        console.log(busesCircles);

        return () => clearInterval(interval);

    }, [routeId])

    // isShuttleRoute = true;
    
    // console.log(shuttlestops);
    // console.log(shuttlestops);
  
    // useEffect(() => {
    //   setLocations([routeOrigin, routeDestination]);
    // }, []);

    // console.log(busesCircles);
  
    return (
            <>
                <Polyline
                coordinates={routeLocations} // Plot the bus route here!
                strokeWidth={2}
                strokeColor="rgba(255,0,0,0.5)"/>

                {/* <Polyline
                    coordinates={[]}
                    strokeWidth={4}
                    strokeColor={'red'}
                    fillColor="rgba(255,0,0,1.0)"
                /> */}
                

                <Circle
                    center={locFromStop(originStop)}
                    radius={10}
                    strokeWidth={5}
                    strokeColor={"red"}
                    fillColor={"red"}
                />

                {
                    busesCircles.map((loc) => <Circle 
                        center={loc}
                        radius={25}
                        strokeWidth={5}
                        strokeColor={"red"}
                        fillColor={"red"}
                    />)
                    }


                <Circle
                    center={locFromStop(destStop)}
                    radius={25}
                    strokeColor={"red"}
                />

        </>);
}
