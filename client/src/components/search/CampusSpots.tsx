import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SpotButton } from "./SpotButton";

import { Building } from "../../../types";

import { colleges } from "../../../__test__/mockData/collegesMock";
import { diningHalls } from "../../../__test__/mockData/diningHallMock";

interface CampusSpotsInterface {
  setBuildingsToRender: Function;
  allBuildings: Building[];
}
export const CampusSpots: React.FC<CampusSpotsInterface> = ({
  setBuildingsToRender,
  allBuildings,
}: CampusSpotsInterface) => {
  const [buttonIsActive, setButtonIsActive] = useState("");

  const handleFilter = (filter: string) => {
    // If the incoming filter is the same as the active button then unactivate the button by setting state to empty string
    if (filter == buttonIsActive) {
      setButtonIsActive("");
      setBuildingsToRender(allBuildings);
      return;
    }

    switch (filter) {
      case "Dining Halls":
        setBuildingsToRender(diningHalls);
        break;
      case "Colleges":
        setBuildingsToRender(colleges);
        break;
      case "Libraries":
        setBuildingsToRender(
          allBuildings.filter((value: Building) => value.type == "LIBRARY")
        );
        break;
    }

    setButtonIsActive(filter);
  };

  return (
    <View style={styles.header}>
      <SpotButton
        handleFilter={() => handleFilter("Colleges")}
        spotType="Colleges"
        buttonIsActive={buttonIsActive}
      />
      <SpotButton
        handleFilter={() => handleFilter("Dining Halls")}
        spotType="Dining Halls"
        buttonIsActive={buttonIsActive}
      />
      <SpotButton
        handleFilter={() => handleFilter("Libraries")}
        spotType="Libraries"
        buttonIsActive={buttonIsActive}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
});
