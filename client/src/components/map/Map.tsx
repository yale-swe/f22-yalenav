import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MAPBOX_AUTH_TOKEN } from "./mapbox.auth.js"
import MapboxGL from "@rnmapbox/maps";

MapboxGL.setAccessToken(MAPBOX_AUTH_TOKEN);

interface MapInterface {
    userLoc: string | null;
}

export const Map: React.FC<MapInterface> = ({userLoc} : MapInterface) => {

    return (
        <MapboxGL.MapView style={styles.map} />
    );
}

const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      height: 300,
      width: 300,
    },
    map: {
      flex: 1
    }
  });