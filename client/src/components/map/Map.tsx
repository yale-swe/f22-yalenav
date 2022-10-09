import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MapboxMap } from "./MapboxMap";
import { ReactNativeMap } from "./ReactNativeMap";

interface MapInterface {
  userLoc: number[] | undefined;
  reactNativeMap: boolean;
  mapboxMap: boolean;
}

// Layer of abstraction to render the map from nodule of our chooising
export const Map: React.FC<MapInterface> = ({
  userLoc,
  reactNativeMap,
  mapboxMap,
}: MapInterface) => {
  return (
    <View>
      {reactNativeMap && <ReactNativeMap userLoc={userLoc} />}
      {mapboxMap && <MapboxMap userLoc={userLoc} />}
    </View>
  );
};
