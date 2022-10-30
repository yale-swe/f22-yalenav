import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { View, Pressable, Text, StyleSheet, Dimensions } from "react-native";
import { Building } from "../../../types";
import {YALE_HEX, BACKEND} from '../../constants';
import axios from "axios";
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

interface MapBannerInterface {
  selectedLocation: Building | undefined;
}

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width;
let distanceFromDestination:number;


// Algorithm for computing disance between two points taken from: https://www.geeksforgeeks.org/program-distance-two-points-earth/
const computeDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
        + Math.cos(lat1) * Math.cos(lat2)
        * Math.pow(Math.sin(dlon / 2),2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 3956;

    // calculate the result, round to nearest hundredths and store the result
    distanceFromDestination = Math.ceil((c * r) * 100) / 100;
    return distanceFromDestination
};

export const MapBanner: React.FC<MapBannerInterface> = ({
  selectedLocation,
}: MapBannerInterface) => {
    const translateY = useSharedValue(0);

    const gesture = Gesture.Pan().onUpdate((event) => {
        console.log(event.translationY);
        translateY.value = event.translationY;
    })


    const handleNavigation = () => {
        console.log("Pressed");
        // const data = "TODO";
        // axios.post(`${BACKEND}/routes`, data).then(res=>{

        // }).catch(error => {

        // })
    };

    const rBottomSheetStyle = useAnimatedStyle(() => {
        return {
            transform:[{ translateY: translateY.value}]
        }
    });
    

  return(
    
        <GestureDetector gesture={gesture}>

       
        <Animated.View style={[styles.scrollView, rBottomSheetStyle]} >
            <View style={styles.line}/>
            {selectedLocation ? (
            <View style={styles.card}>
                <Text>{selectedLocation.name} is</Text>
                <Text> {computeDistance(selectedLocation.lat, selectedLocation.lon, 41.3163, -72.922585) < 1 ? distanceFromDestination * 5280 + " Feet": distanceFromDestination+ " Miles"} </Text>
                <Pressable style={styles.button} onPress = {handleNavigation}>
                    <Text style={{color:'white'}}>Begin Navigation...</Text>
                </Pressable>
            </View>
            ) : null}
        </Animated.View> 
        </GestureDetector>
    

  );

};

const styles = StyleSheet.create({
   line:{
    width: 75,
    height:4,
    backgroundColor:'grey',
    alignSelf:'center',
    borderRadius:3,
    marginTop:15,
   },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    flexDirection:'row',
    alignItems:'center',
    borderRadius: 15,
  },
  scrollView: {
    position: "absolute",
    width:'100%',
    height:height,
    top:height / 1.5,
    backgroundColor:"white",
  },
  button:{
    backgroundColor:YALE_HEX,
    borderRadius: 4,
    padding: 10,
    
  },
 
})


export default MapBanner;