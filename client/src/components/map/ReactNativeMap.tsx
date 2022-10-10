import React from "react";
import { Text, View } from "react-native";

interface ReactNativeMapInterface {
  userLoc: number[] | undefined;
}

export const ReactNativeMap: React.FC<ReactNativeMapInterface> = ({
  userLoc,
}: ReactNativeMapInterface) => {
  return (
    <View>
      <Text>Open up ReactNAtiveMap.tsx</Text>
    </View>
  );
};
