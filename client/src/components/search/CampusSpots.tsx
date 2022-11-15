import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Building, LatLng, Results } from "../../../types";
import { YALE_HEX } from "../../constants";

interface CampusSpotsInterface {}
export const CampusSpots: React.FC<
  CampusSpotsInterface
> = ({}: CampusSpotsInterface) => {
  const [buttonIsActive, setButtonIsActive] = useState("");

  const handleFilter = (filter: string) => {
    // If the incoming filter is the same as the active button then unactivate the button by setting state to empty string
    if (filter == buttonIsActive) {
      setButtonIsActive("");
      return;
    }

    setButtonIsActive(filter);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => handleFilter("Dining Halls")}
        activeOpacity={0.5}
        style={[
          styles.button,
          buttonIsActive == "Dining Halls" ? styles.button_active : null,
        ]}
      >
        <Text
          style={[
            styles.text,
            buttonIsActive == "Dining Halls" ? styles.text_active : null,
          ]}
        >
          Dining Halls
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleFilter("Colleges")}
        activeOpacity={0.5}
        style={[
          styles.button,
          buttonIsActive == "Colleges" ? styles.button_active : null,
        ]}
      >
        <Text
          style={[
            styles.text,
            buttonIsActive == "Colleges" ? styles.text_active : null,
          ]}
        >
          Colleges
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleFilter("Libraries")}
        activeOpacity={0.5}
        style={[
          styles.button,
          buttonIsActive == "Libraries" ? styles.button_active : null,
        ]}
      >
        <Text
          style={[
            styles.text,
            buttonIsActive == "Libraries" ? styles.text_active : null,
          ]}
        >
          Libraries
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  button: {
    backgroundColor: "white",
    padding: 7,
    borderRadius: 40,
    borderColor: YALE_HEX,
    borderWidth: 2,
  },
  button_active: {
    backgroundColor: YALE_HEX,
  },
  text_active: {
    color: "white",
  },
  text: {
    color: YALE_HEX,
    alignSelf: "center",
  },
});
