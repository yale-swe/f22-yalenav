
import React, { Component, useEffect, useState } from "react";
import { Polyline, Circle, Marker } from "react-native-maps";
import axios from "axios";
import { LatLng, Results, ShuttleStop } from "../../../types";
import { BACKEND, YALE_HEX } from "../../constants";


type Route = {
    id: number,
    path: number[],
    active: boolean,
    stops: number[],
    color: string
};

function absDistance(loc1 : LatLng, loc2 : LatLng) {
    return Math.abs(loc1.latitude - loc2.latitude) + Math.abs(loc1.longitude - loc2.longitude);
}

function locFromStop(stop : ShuttleStop) {
    return {latitude: stop.lat, longitude: stop.lon};
}

function getShuttleRoute(origLoc : LatLng, endLoc : LatLng, 
    routes_response : Array<Route>,
    shuttlestops : Map<Number, ShuttleStop>,
    callback : Function) {

    let origStop = -1;
    let destStop = -1;
    let routeId = -1;
    let routeLocations : number[] = [];
    let routeColor : string = "";
    
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

    routes_response.forEach(function (route: Route) {
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
        routeColor = route.color;
        routeLocations = route.path;
        origStop = tOrigStop;
        destStop = tDestStop;
    }

    let ogS = shuttlestops.get(origStop);
    let dsS = shuttlestops.get(destStop);
    
    callback(ogS, dsS, routeId, routeColor, routeLocations, 
        shuttlestops.get(altOrig), shuttlestops.get(altDest));

    });
}


function getRideInfoBetween(routeId: number, origStop: number, 
            endStop: number, callback : Function) {


    axios.get('https://yaleshuttle.doublemap.com/map/v2/etas', {
      params: {route: routeId}
    })
    .then(function (response) {

    //   let bus_id = response.data.etas[origStop][0].bus_id;
      let ogbus : {avg: number, bus_id: number} = response.data.etas[origStop][0];
    //   let duration = response.data.etas[endStop][0].avg - response.data.etas[origStop][0].avg;

      let endTime = -1.0;
      response.data.etas[endStop].forEach((bus : {avg : number, bus_id: number}) => {
        if (bus.bus_id == ogbus.bus_id) 
            endTime = bus.avg;
        });

      callback({ duration: endTime - ogbus.avg, tminus: ogbus.avg});
    });
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
    let [routes, setRoutes] = useState(new Array<Route>());
    
    // UI customizability can be added in here; whether you want
    // the lines to be thicker, a certain color, etc
  
    useEffect(() => {
      // console.log("route effect goin");
      axios
      .get('https://yaleshuttle.doublemap.com/map/v2/routes')
      .then((res : {data : Route[]}) => {
          setRoutes(res.data.filter(
            (value : Route) => 
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
    let [routeColor, setRouteColor] = useState<string>("black");
    let [fullBusRoute, setFullBusRoute] = useState<Array<LatLng>>([]);

    let [busesCircles, setBusCircles] = useState<Array<LatLng>>([]);
    let [rideInfo, setRideInfo] = useState<{duration: number,
       distance: number, tminus: number}>({duration: -1,
        distance: -1, tminus: -1});
  
    function RideInfoCallback(info : {duration: number,
    distance: number, tminus: number}) {
      
      setRideInfo(info);
      
    //   results.push({
    //     type: "SHUTTLE",
    //     duration: info.duration,
    //     distance: info.distance,
    //   });
      }
  
    function callbackFunction(oS : ShuttleStop, dS : ShuttleStop, routeID : number, routeColor : string,
       routeLocs : Array<number>, altOriginStation : ShuttleStop, altDestStation : ShuttleStop) {
          
        // console.log(oS, dS);
        if (!dS || !oS || routeID == -1) {
          return;
        } 
  
        setOrigin(oS);
        setDest(dS);
        setRouteID(routeID);

        let locsArr = Array<LatLng>(Math.floor(routeLocs.length / 2));
        for (let i = 0; i < routeLocs.length; i += 2) {
            const ind = Math.floor(i / 2);
            locsArr[ind] = {latitude: routeLocs[i], longitude: routeLocs[i + 1]};
        }

        setLocations(locsArr);
        setRouteColor(routeColor);

        getRideInfoBetween(routeID, oS.id, dS.id, RideInfoCallback);

        return;
        // Use the second-closest locations as alternatives -- for example, if you're
        // in Morse and request the closest stop, you might get the PWG one. Maybe you want 
    }
  
    useEffect(() => {
      getShuttleRoute(routeOrigin, routeDestination, routes, shuttlestops, callbackFunction);
    }, [shuttlestops, routes]);
  
    useEffect(() => {

        const interval = setInterval(() => {
            axios
            .get('https://yaleshuttle.doublemap.com/map/v2/buses')
            .then((res : {data : {id: number, route: number, lat: number, lon: number}[]}) => {
                let locs = res.data.filter(
                (value : {id: number, route: number, lat: number, lon: number}) => 
                    {return value.route == routeId; 
                });

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

        return () => clearInterval(interval);

    }, [routeId])
  
    callback && callback(true, {timeUntilStart: rideInfo.tminus, duration: rideInfo.duration, 
        originStopLoc: locFromStop(originStop), destStopLoc: locFromStop(destStop)});

    return (
            <>

                <Polyline
                    coordinates={routeLocations} // Plot the bus route here!
                    strokeWidth={4}
                    strokeColor={routeColor}
                />  

                <Marker
                    coordinate = {locFromStop(originStop)}
                    pinColor={"green"}
                    // center={locFromStop(originStop)}
                    // radius={10}
                    // strokeWidth={5}
                    // strokeColor={"red"}
                    // fillColor={"red"}
                />

                {
                    busesCircles.map((loc, ind) => <Circle 
                        key={ind}
                        center={loc}
                        radius={25}
                        strokeWidth={5}
                        strokeColor={"black"}
                        fillColor={routeColor}
                    />)
                }


                <Marker // Circle
                    coordinate = {locFromStop(destStop)}
                    pinColor={"blue"}
                    // center={locFromStop(destStop)}
                    // radius={25}
                    // strokeColor={"red"}
                />

                
            
        </>);
}
