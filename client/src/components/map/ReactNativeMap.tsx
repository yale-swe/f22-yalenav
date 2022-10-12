import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

interface ReactNativeMapInterface {}

export const ReactNativeMap: React.FC<
  ReactNativeMapInterface
> = ({}: ReactNativeMapInterface) => {
  //medium.com/quick-code/how-to-add-awesome-maps-to-a-react-native-app-%EF%B8%8F-fc7cbde9c7e9
  // https://mapstyle.withgoogle.com/
  const mapStyle = require("./mapStyle.json");
  return (
    <MapView
      style={{ alignSelf: "stretch", height: "125%" }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      followsUserLocation={true}
      initialRegion={yaleUni}
      customMapStyle={mapStyle}
    />
  );
};

var yaleUni = {
  latitude: 41.3163,
  longitude: -72.922585,
  latitudeDelta: 0.0622,
  longitudeDelta: 0.0121,
};
