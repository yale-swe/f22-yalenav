import React from "react";
import { Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

interface ReactNativeMapInterface {
  userLoc: number[] | undefined;
}

export const ReactNativeMap: React.FC<ReactNativeMapInterface> = ({
  userLoc,
}: ReactNativeMapInterface) => {
  //medium.com/quick-code/how-to-add-awesome-maps-to-a-react-native-app-%EF%B8%8F-fc7cbde9c7e9
  const mapStyle = require("./mapStyle.json");
  return (
    <MapView
      style={{ alignSelf: "stretch", height: "100%" }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      showsBuildings={true}
      initialRegion={{
        latitude: 41.3163,
        longitude: -72.922585,
        latitudeDelta: 0.0622,
        longitudeDelta: 0.0121,
      }}
      customMapStyle={mapStyle}
    />
  );
};
