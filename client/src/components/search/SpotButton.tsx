import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { spotButtonStyle } from "../../css/styles";

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
        spotButtonStyle.button,
        buttonIsActive == spotType ? spotButtonStyle.button_active : null,
      ]}
    >
      <Text
        style={[
          spotButtonStyle.text,
          buttonIsActive == spotType ? spotButtonStyle.text_active : null,
        ]}
      >
        {spotType}
      </Text>
    </TouchableOpacity>
  );
};
