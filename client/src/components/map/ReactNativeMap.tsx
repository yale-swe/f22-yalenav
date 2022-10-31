import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Location, Building, ShuttleStop } from "../../../types";
import { RoutingView } from "../routing/RoutingView";

// To get durations, route distance, etc; pass function to 
// resultHandler(duration, distance), and it will be called when calculated
interface ReactNativeMapInterface {
  selectedLocation: Building | undefined;
  origin: Location | undefined;
  destination: Building | ShuttleStop | undefined;
  resultHandler?: Function | undefined;
}

export const ReactNativeMap: React.FC<ReactNativeMapInterface> = ({
  selectedLocation, origin, destination, resultHandler
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
          coordinate={selectedLocation.loc}
          title={selectedLocation.name}
          description={selectedLocation.abbreviation.toUpperCase()}
        />
      )}

      {
        origin && destination && 
        (<RoutingView 
          routeOrigin={origin} 
          routeDestination={destination.loc}
          resultHandler={resultHandler}
          mode={"walking"}/>
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
