import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
// import MapViewDirections from "react-native-maps-directions";
import { Location, Building, ShuttleStop } from "../../../types";
import { RoutingView } from "../routing/RoutingView";

interface ReactNativeMapInterface {
  selectedLocation: Building | undefined;
  origin: Location | undefined;
  destination: Building | ShuttleStop | undefined;
}

export const ReactNativeMap: React.FC<ReactNativeMapInterface> = ({
  selectedLocation, origin, destination
}: ReactNativeMapInterface) => {
  // medium.com/quick-code/how-to-add-awesome-maps-to-a-react-native-app-%EF%B8%8F-fc7cbde9c7e9
  // https://mapstyle.withgoogle.com/
  const mapStyle = require("./mapStyle.json");

  const orig = {latitude:41.306237, longitude:-72.929741};
  const dest = {latitude: 41.312573, longitude: -72.928726};
  const APIKEY = 'AIzaSyAXXjQ9BSLJ3SwDmJKjaCsgGQv1IiRQ9Q8';



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
        orig && dest && 
        (<RoutingView 
          routeOrigin={orig} 
          routeDestination={dest} 
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
