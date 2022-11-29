import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Building } from "../../../types";
import { SpotButton } from "./SpotButton";

interface CampusSpotsInterface {
  setBuildingsToRender: Function;
  allBuildings: Building[];
  diningHallBuildings: Building[];
  collegeBuildings: Building[];
  libraryBuildings: Building[];
}
export const CampusSpots: React.FC<CampusSpotsInterface> = ({
  setBuildingsToRender,
  allBuildings,
  diningHallBuildings,
  collegeBuildings,
  libraryBuildings,
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
        setBuildingsToRender(diningHallBuildings);
        break;
      case "Colleges":
        setBuildingsToRender(collegeBuildings);
        break;
      case "Libraries":
        setBuildingsToRender(libraryBuildings);
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
    justifyContent: "space-between",
    width: "65%",
  },
});
