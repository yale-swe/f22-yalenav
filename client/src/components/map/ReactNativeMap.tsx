import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Polygon } from "react-native-maps";
import { Building } from "../../../types";
import { YALE_HEX } from "../../constants";

interface ReactNativeMapInterface {
  selectedLocation: Building | undefined;
  buildings: Building[];
}

export const ReactNativeMap: React.FC<ReactNativeMapInterface> = ({
  selectedLocation,
  buildings,
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
          coordinate={selectedLocation.coords}
          title={selectedLocation.name}
          description={selectedLocation.abbreviation.toUpperCase()}
        />
      )}
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
  );
};

var yaleUni = {
  latitude: 41.3163,
  longitude: -72.922585,
  latitudeDelta: 0.0622,
  longitudeDelta: 0.0121,
};
