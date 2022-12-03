import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from "react-native-maps";
import { Building, LatLng, Results } from "../../../types";
import { YALE_HEX } from "../../constants";
import { RoutingMode, sendLocationNotification } from "../../utils";
import { RoutingView } from "../routing/RoutingView";
import MapBanner from "./MapBanner";

// To get durations, route distance, etc; pass function to

// resultHandler([{type, duration, distance}]), and it will be called when calculated
interface ReactNativeMapInterface {
  selectedLocation: Building | undefined;
  origin: LatLng | undefined;
  buildings: Building[];
}

export const ReactNativeMap: React.FC<ReactNativeMapInterface> = ({
  selectedLocation,
  buildings,
  origin,
}: ReactNativeMapInterface) => {
  // medium.com/quick-code/how-to-add-awesome-maps-to-a-react-native-app-%EF%B8%8F-fc7cbde9c7e9
  // https://mapstyle.withgoogle.com/
  const mapStyle = require("../../css/mapStyle.json");
  const [isNavigating, setIsNavigating] = useState(false);
  const [results, setResults] = useState<Results[]>();

  // When the user changes the location, toggle off
  useEffect(() => {
    setIsNavigating(false);
    if (selectedLocation) centerOnEvent();
  }, [selectedLocation]);

  const passResults = (childData: Array<Results>) => {
    setResults(childData);
    console.log(childData);
  };

  let mapRef = useRef();

  const centerOnEvent = async () => {
    if (mapRef && mapRef.current) {
      const map = mapRef.current;
      const latitude = origin?.latitude;
      const longitude = origin?.longitude;
      if (!origin) {
        sendLocationNotification();
      } else if (
        origin &&
        selectedLocation == undefined &&
        latitude &&
        longitude
      ) {
        (map as MapView).animateToRegion(
          {
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          2000
        );
      } else if (origin && selectedLocation)
        (map as MapView).fitToCoordinates([origin, selectedLocation.coords], {
          edgePadding: {
            top: 100,
            right: 100,
            bottom: 500,
            left: 100,
          },
          animated: true,
        });
    }
  };

  return (
    <>
      <MapView
        style={{ alignSelf: "auto", height: "91%" }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followsUserLocation={true}
        initialRegion={yaleUni}
        customMapStyle={mapStyle}
        zoomEnabled={true}
        testID="mapview-map"
        ref={mapRef}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.coords.latitude,
              longitude: selectedLocation.coords.longitude,
            }}
            title={selectedLocation.name}
            description={selectedLocation.type}
          />
        )}
        {isNavigating && origin && selectedLocation ? (
          <RoutingView
            routeOrigin={origin}
            routeDestination={{
              latitude: selectedLocation.coords.latitude,
              longitude: selectedLocation.coords.longitude,
            }}
            resultHandler={passResults}
            mode={RoutingMode.shuttle}
          />
        ) : null}
        <>
          {buildings
            .filter((b: Building) => b.tile.length)
            .map((b: Building, i: number) => {
              return (
                <Polygon coordinates={b.tile} fillColor={YALE_HEX} key={i} />
              );
            })}
        </>
      </MapView>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          position: "absolute",
          bottom: "17%",
          right: "5%",
          alignSelf: "flex-end",
          justifyContent: "space-between",
          backgroundColor: "white",
          borderWidth: 2,
          borderRadius: 40,
        }}
      >
        <TouchableOpacity onPress={centerOnEvent}>
          <Text
            style={{
              paddingHorizontal: 8,
              fontSize: 40,
              color: YALE_HEX,
              transform: [{ rotate: "225deg" }],
            }}
          >
            ➤
          </Text>
        </TouchableOpacity>
      </View>
      {selectedLocation ? (
        <MapBanner
          selectedLocation={selectedLocation}
          navigationHandler={() => {
            setIsNavigating(true);
          }}
          results={results}
        />
      ) : null}
    </>
  );
};

var yaleUni = {
  latitude: 41.3163,
  longitude: -72.922585,
  latitudeDelta: 0.0622,
  longitudeDelta: 0.0121,
};
