import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { YALE_HEX } from "../../constants";

interface SpotButtonInterface {
  handleFilter: Function;
  spotType: String;
  buttonIsActive: String;
}
export const SpotButton: React.FC<SpotButtonInterface> = ({
  handleFilter,
  spotType,
  buttonIsActive,
}: SpotButtonInterface) => {
  return (
    <TouchableOpacity
      onPress={() => handleFilter()}
      activeOpacity={0.5}
      style={[
        styles.button,
        buttonIsActive == spotType ? styles.button_active : null,
      ]}
    >
      <Text
        style={[
          styles.text,
          buttonIsActive == spotType ? styles.text_active : null,
        ]}
      >
        {spotType}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
