import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Building, LatLng, Results } from "../../../types";
import { YALE_HEX } from "../../constants";
const buildingThreeMock: Building = {
  _id: "636af734cd21662437d3cda1",
  abbreviation: "Evn",
  address: "Hillhouse Avenue, 56, New Haven, Ct, 06511",
  coords: {
    latitude: 41.315689,
    longitude: -72.923332,
  },
  name: "Evans Hall, Thomas M.",
  tile: [
    {
      latitude: 41.31566203457868,
      longitude: -72.92344942688942,
    },
    {
      latitude: 41.315857950579556,
      longitude: -72.92337365448475,
    },
    {
      latitude: 41.315853921464644,
      longitude: -72.92335487902164,
    },
    {
      latitude: 41.315857950579556,
      longitude: -72.9233528673649,
    },
    {
      latitude: 41.31583629408398,
      longitude: -72.92325228452684,
    },
    {
      latitude: 41.31583125768864,
      longitude: -72.92325697839262,
    },
    {
      latitude: 41.315827732211666,
      longitude: -72.92324021458626,
    },
    {
      latitude: 41.31580406114703,
      longitude: -72.92324893176557,
    },
    {
      latitude: 41.31579549927046,
      longitude: -72.9232107102871,
    },
    {
      latitude: 41.31576528087361,
      longitude: -72.92322210967541,
    },
    {
      latitude: 41.315763266313326,
      longitude: -72.92320534586906,
    },
    {
      latitude: 41.3156212396561,
      longitude: -72.92326033115388,
    },
    {
      latitude: 41.315628290632205,
      longitude: -72.9232891649008,
    },
    {
      latitude: 41.315616203244126,
      longitude: -72.92329587042332,
    },
    {
      latitude: 41.31564440714614,
      longitude: -72.92342394590379,
    },
    {
      latitude: 41.31565649452897,
      longitude: -72.92342126369478,
    },
  ],
};
const buildingTwoMock: Building = {
  _id: "636af734cd21662437d3cc5b",
  abbreviation: "Rah",
  address: "York Street, 232, New Haven, Ct, 06511",
  coords: {
    latitude: 41.309894,
    longitude: -72.931056,
  },
  name: "Rose Alumni House",
  tile: [
    {
      latitude: 41.30994243803472,
      longitude: -72.93135926127434,
    },
    {
      latitude: 41.31005324865213,
      longitude: -72.9312774538994,
    },
    {
      latitude: 41.30987393683157,
      longitude: -72.93084964156151,
    },
    {
      latitude: 41.30983968620302,
      longitude: -72.9308804869652,
    },
    {
      latitude: 41.30987998105828,
      longitude: -72.93099448084833,
    },
    {
      latitude: 41.309812487161636,
      longitude: -72.93104678392412,
    },
  ],
};
const buildingOneMock: Building = {
  _id: "636af734cd21662437d3cc4f",
  abbreviation: "Hlh46",
  address: "Hillhouse Avenue, 46, New Haven, Ct, 06511",
  coords: {
    latitude: 41.315049,
    longitude: -72.923594,
  },
  name: "Hillhouse Ave,46",
  tile: [
    {
      latitude: 41.315116085598014,
      longitude: -72.9237598925829,
    },
    {
      latitude: 41.315189617738255,
      longitude: -72.92373374104501,
    },
    {
      latitude: 41.31513371317345,
      longitude: -72.92345143854618,
    },
    {
      latitude: 41.315091910629675,
      longitude: -72.92346686124803,
    },
    {
      latitude: 41.3150803267875,
      longitude: -72.92341388761999,
    },
    {
      latitude: 41.314997225250714,
      longitude: -72.92344406247139,
    },
    {
      latitude: 41.315007801815824,
      longitude: -72.92350441217424,
    },
    {
      latitude: 41.31497053200732,
      longitude: -72.92351782321931,
    },
    {
      latitude: 41.3150072981699,
      longitude: -72.92368881404401,
    },
    {
      latitude: 41.31509543614646,
      longitude: -72.92365729808809,
    },
  ],
};

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
        setBuildingsToRender([buildingOneMock]);
        break;
      case "Colleges":
        setBuildingsToRender([buildingTwoMock]);
        break;
      case "Libraries":
        setBuildingsToRender([buildingThreeMock]);
        break;
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
