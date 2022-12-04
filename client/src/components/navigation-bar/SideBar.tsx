import React from "react";
import { Switch, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { LatLng } from "../../../types";
import { YALE_HEX } from "../../constants";

interface SideBarInterface {
  centerOnEvent: ((event: any) => void) & (() => void);
  toggleSwitch: (value: boolean) => void | Promise<void>;
  origin: LatLng | undefined;
  shuttleEnabled: boolean;
}

export const SideBar: React.FC<SideBarInterface> = ({
  origin,
  centerOnEvent,
  toggleSwitch,
  shuttleEnabled,
}: SideBarInterface) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          position: "absolute",
          bottom: "25%",
          right: "5%",
          alignSelf: "flex-end",
          justifyContent: "space-between",
          backgroundColor: "white",
          borderWidth: 2,
          borderRadius: 18,
        }}
      >
        <FontAwesome5
          name={shuttleEnabled ? "bus" : "walking"}
          style={{
            alignSelf: "center",
            fontWeight: "bold",
            fontSize: 20,
            margin: 10,
          }}
        />
        <Switch
          trackColor={{ false: YALE_HEX, true: YALE_HEX }}
          thumbColor={"white"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={shuttleEnabled}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          position: "absolute",
          bottom: "17%",
          right: "5%",
          alignSelf: "flex-end",
          justifyContent: "space-between",
          backgroundColor: "white",
          borderWidth: 2,
          borderRadius: 40,
        }}
      >
        <TouchableOpacity onPress={centerOnEvent}>
          <Text
            style={{
              paddingHorizontal: 9,
              fontSize: 40,
              color: YALE_HEX,
              transform: [{ rotate: origin != undefined ? "225deg" : "0deg" }],
            }}
          >
            {origin != undefined ? "➤" : "x"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
