import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Building } from "../../../types";
import {Keyboard, TouchableWithoutFeedback} from "react-native";

interface ReactNativeMapInterface {
  selectedLocation: Building | undefined;
}

export const ReactNativeMap: React.FC<ReactNativeMapInterface> = ({
  selectedLocation,
}: ReactNativeMapInterface) => {
  // medium.com/quick-code/how-to-add-awesome-maps-to-a-react-native-app-%EF%B8%8F-fc7cbde9c7e9
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
    >
      {selectedLocation && (
        <Marker
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lon,
          }}
          title={selectedLocation.name}
          description={selectedLocation.abbreviation.toUpperCase()}
        />
      )}
    </MapView>
  );
};

var yaleUni = {
  latitude: 41.3163,
  longitude: -72.922585,
  latitudeDelta: 0.0622,
  longitudeDelta: 0.0121,
};
