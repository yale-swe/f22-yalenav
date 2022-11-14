import React, { useEffect, useState } from "react";
import MapView, { Polygon, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapBanner from "./MapBanner";
import { LatLng, Building, ShuttleStop, Results } from "../../../types";
import { YALE_HEX } from "../../constants";
import { RoutingView, RoutingMode } from "../routing/RoutingView";

// To get durations, route distance, etc; pass function to

// resultHandler([{type, duration, distance}]), and it will be called when calculated
interface ReactNativeMapInterface {
  selectedLocation: Building | undefined;
  buildings: Building[];
  origin: LatLng | undefined;
}

export const ReactNativeMap: React.FC<ReactNativeMapInterface> = ({
  selectedLocation,
  buildings,
  origin,
}: ReactNativeMapInterface) => {
  // medium.com/quick-code/how-to-add-awesome-maps-to-a-react-native-app-%EF%B8%8F-fc7cbde9c7e9
  // https://mapstyle.withgoogle.com/
  const mapStyle = require("./mapStyle.json");
  const [isNavigating, setIsNavigating] = useState(false);
  const [results, setResults] = useState<Results[]>();

  // When the user changes the location, toggle off
  useEffect(() => {
    setIsNavigating(false);
  }, [selectedLocation]);

  const passResults = (childData: Array<Results>) => {
    setResults(childData);
    console.log(childData);
  };

  return (
    <>
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
              latitude: selectedLocation.coords.latitude,
              longitude: selectedLocation.coords.longitude,
            }}
            title={selectedLocation.name}
            description={selectedLocation.abbreviation.toUpperCase()}
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
            mode={RoutingMode.noshuttle}
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
