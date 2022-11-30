import * as Loc from "expo-location";
import React, { useEffect, useState } from "react";
import { Alert, Linking, Pressable, Text, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Building, LatLng, Results } from "../../../types";
import { computeDistance } from "../../utils";
import {
  mapBannerStyle,
  height,
  BANNER_HEIGHT,
  COLLAPSED_BANNER_HEIGHT,
} from "../../css/styles";

const sendSettingNotification = () => {
  Alert.alert(
    "Please enable location in settings.",
    "YaleNav needs your location to provide routing details. The estimated distance is using Yale University's approximate location.",
    [
      {
        text: "Okay",
        onPress: () => {
          Linking.openURL("app-settings:");
        },
      },
    ]
  );
};

interface MapBannerInterface {
  selectedLocation: Building | undefined;
  navigationHandler: Function | undefined;
  results: Array<Results> | undefined;
}

export const MapBanner: React.FC<MapBannerInterface> = ({
  selectedLocation,
  navigationHandler,
  results,
}: MapBannerInterface) => {
  // State for holding onto user's coords. Inital state set to Yale University.
  const [userLocation, setUserLocation] = useState<LatLng>({
    latitude: 41.3163,
    longitude: -72.922585,
  });

  const [distanceFromDestination, setDistanceFromDestination] =
    useState<number>();

  const updateUserLocation = async () => {
    // Get the coords and update userLocation state
    const loc = await Loc.getCurrentPositionAsync({});
    setUserLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  };

  const getUserLocation = async () => {
    let { granted, canAskAgain } = await Loc.getForegroundPermissionsAsync();

    // If the canAskAgain attribute is false then the user should be directed to the settings to change thier permissions
    // per expo-locations documentation
    if (!granted && !canAskAgain) {
      sendSettingNotification();

      // Need to change in the future but couldn't tell when the user would redirect back from settings to the app so used a
      // timeout for 10 seconds and then prompt the user for permission again if they allow us the ability to ask again
      // (ie selecting any one of the options in settings besides never)
      setTimeout(async () => {
        let { status } = await Loc.requestForegroundPermissionsAsync();
        if (status == "granted") {
          await updateUserLocation();
        }
        return;
      }, 10000);

      // If the user doesn't let us use their location, alert them they will not have access to all the features (change in future to ask again potentially)
    } else if (!granted) {
      Alert.alert(
        "YaleNav Requires Your Location!",
        "For the full experience of using YaleNav, we require your location in order to perform the routing!"
      );
      let { status } = await Loc.requestForegroundPermissionsAsync();

      if (status == "granted") {
        await updateUserLocation();
      }
      return;
    } else {
      await updateUserLocation();
    }
  };

  // Get's called every time the component renders
  useEffect(() => {
    getUserLocation();
    if (selectedLocation) {
      setDistanceFromDestination(
        computeDistance(userLocation, {
          latitude: selectedLocation.coords.latitude,
          longitude: selectedLocation.coords.longitude,
        })
      );
    }
  }, [selectedLocation]);

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
        translateY.value = withSpring(COLLAPSED_BANNER_HEIGHT);
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
    if (results && results[0] && results[0].legs && results[0].legs[0].steps) {
      const duration = results[0].duration;

      const navigationResults = results[0].legs[0].steps.map(
        (step: any, i: number) => {
          // Replace all html tags with a space. Add a space because some tags don't have spaces between and causes the text to
          // not have any space between.
          let instructions = step.html_instructions.replace(
            /(<([^>]+)>)/gi,
            " "
          );
          // Replace mutliple spaces with a single space
          instructions = instructions.replace(/\s\s+/g, " ");
          instructions = instructions.replace("Restricted usage road", " ");
          return (
            <View key={i} style={{ flexDirection: "column" }}>
              <Text style={{ alignSelf: "center", padding: 10 }}>
                {instructions}
              </Text>
              <Text style={{ alignSelf: "center", padding: 5, color: "grey" }}>
                {step.duration.text} ↓ {step.distance.text}
              </Text>
            </View>
          );
        }
      );

      return (
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={mapBannerStyle.timeContainer}>
            <Text style={mapBannerStyle.timeText}>{Math.ceil(duration)}</Text>
            <Text style={mapBannerStyle.timeText}>min</Text>
          </View>

          <View style={mapBannerStyle.stepsContainer}>{navigationResults}</View>
        </View>
      );
    }
  };

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[mapBannerStyle.scrollView, rBottomSheetStyle]}>
        <View style={mapBannerStyle.line} />
        {selectedLocation && !isUserNavigating ? (
          <View style={mapBannerStyle.card}>
            <View style={mapBannerStyle.text}>
              <Text style={mapBannerStyle.title}>{selectedLocation.name}</Text>
              <Text style={{ alignSelf: "center", fontSize: 15, padding: 5 }}>
                {selectedLocation.address}
              </Text>
              <Text
                style={{
                  alignSelf: "center",
                  fontStyle: "italic",
                  paddingBottom: 5,
                }}
              >
                {distanceFromDestination
                  ? distanceFromDestination < 1
                    ? (distanceFromDestination * 5280).toFixed(2) + " Feet"
                    : distanceFromDestination.toFixed(2) + " Miles"
                  : ""}
              </Text>
            </View>
            <Pressable
              style={mapBannerStyle.button}
              onPress={(r) => {
                navigationHandler && navigationHandler();
                setIsUserNavigating(true);
              }}
            >
              <Text style={{ color: "white" }}>Directions</Text>
            </Pressable>
          </View>
        ) : selectedLocation && isUserNavigating ? (
          <ScrollView style={mapBannerStyle.card}>
            {displayDirections()}
          </ScrollView>
        ) : null}
      </Animated.View>
    </GestureDetector>
  );
};

export default MapBanner;
