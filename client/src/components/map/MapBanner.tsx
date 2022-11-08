import React, { useEffect, useState } from "react";
import { View, Pressable, Text, StyleSheet, Dimensions } from "react-native";
import { Building, Location, Results } from "../../../types";
import { YALE_HEX } from "../../constants";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface MapBannerInterface {
  selectedLocation: Building | undefined;
  navigationHandler: Function | undefined;
  results: Array<Results> | undefined;
}

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width;
const BANNER_HEIGHT = -height / 3;

let distanceFromDestination: number;

// Algorithm for computing disance between two points taken from: https://www.geeksforgeeks.org/program-distance-two-points-earth/
const computeDistance = (loc1: Location, loc2: Location) => {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  let lon1 = (loc1.longitude * Math.PI) / 180;
  let lon2 = (loc2.longitude * Math.PI) / 180;
  let lat1 = (loc1.latitude * Math.PI) / 180;
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
  distanceFromDestination = c * r;
  return c * r;
};

export const MapBanner: React.FC<MapBannerInterface> = ({
  selectedLocation,
  navigationHandler,
  results,
}: MapBannerInterface) => {
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const [isUserNavigating, setIsUserNavigating] = useState(false);
  // If the user searches a new location
  useEffect(() => {
    setIsUserNavigating(false);
  }, [selectedLocation]);

  // Handles the logic for moving the banner up and down to designated positions.
  const gesture = Gesture.Pan()
    .onStart(() => {
      // To create a smooth animation we start the movement from the previous y value.
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      //   To create the smoooth animation, consider the previous y value and begin animation from there.
      translateY.value = event.translationY + context.value.y;
      //   Set the max to be a third of the height of the screen so the user cannot pull this banner higher than that
      translateY.value = Math.max(translateY.value, BANNER_HEIGHT);
    })
    // Creates the snap effect when a user swipes up or down the banner snaps into the correct y position.
    .onEnd(() => {
      // If the user is swiping down on the banner then want to show the little grey line only
      if (translateY.value > -height / 5) {
        translateY.value = withSpring(-50);
      } else {
        // If the user is swiping up on the banner then set the y value to be a third of the screen height.
        translateY.value = withSpring(BANNER_HEIGHT);
      }
    });

  // When the component first loads, set it's y position to the banner height position.
  useEffect(() => {
    translateY.value = withSpring(BANNER_HEIGHT);
  });

  // Changs the y position for the banner and animates it.
  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const displayDirections = () => {
    console.log("display", results);
    if (results && results[0] && results[0].legs && results[0].legs[0].steps) {
      console.log(results[0].legs[0].steps);
      return results[0].legs[0].steps.map((step) => {
        return (
          <Text key={step.html_instructions}>{step.html_instructions}</Text>
        );
      });
    }
  };

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.scrollView, rBottomSheetStyle]}>
        <View style={styles.line} />
        {selectedLocation && !isUserNavigating ? (
          <View style={styles.card}>
            <View style={styles.text}>
              <Text style={styles.title}>{selectedLocation.name}</Text>
              <Text>{selectedLocation.address}</Text>
              <Text>
                {computeDistance(
                  {
                    latitude: selectedLocation.lat,
                    longitude: selectedLocation.lon,
                  },
                  {
                    latitude: 41.3163,
                    longitude: -72.922585,
                  }
                ) < 1
                  ? (distanceFromDestination * 5280).toFixed(2) + " Feet"
                  : distanceFromDestination.toFixed(2) + " Miles"}
              </Text>
            </View>
            <Pressable
              style={styles.button}
              onPress={(r) => {
                navigationHandler && navigationHandler();
                setIsUserNavigating(true);
              }}
            >
              <Text style={{ color: "white" }}>Directions</Text>
            </Pressable>
          </View>
        ) : selectedLocation && isUserNavigating ? (
          displayDirections()
        ) : null}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    margin: 5,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    alignSelf: "center",
    borderRadius: 3,
    marginTop: 15,
  },
  card: {
    padding: 5,
    marginVertical: 40,
    backgroundColor: "#FFF",
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    borderRadius: 20,
  },
  scrollView: {
    zIndex: 1,
    position: "absolute",
    width: "100%",
    height: height,
    top: height,
    backgroundColor: "white",
    borderRadius: 25,
  },
  button: {
    position: "absolute",
    bottom: "30%",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: YALE_HEX,
    width: "25%",
    borderRadius: 10,
    padding: 10,
  },
});

export default MapBanner;
