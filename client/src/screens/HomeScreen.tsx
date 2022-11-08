import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import axios from "axios";
import { Building } from "../../types";

import { Map, Profile, Search, Shortcut } from "../components";
import { BACKEND } from "../constants";
import { useAuth } from "../contexts/Auth";

var yaleUni = {
  latitude: 41.3163,
  longitude: -72.922585,
};

export default function HomeScreen() {
  const auth = useAuth();
  // Load Yale locations
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    axios
      .get<{ buildings: Building[] }>(`${BACKEND}/building`)
      .then((res) => {
        setBuildings(res.data.buildings);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [BACKEND]);

  // Select location of interest
  const [selectedLocation, setSelectedLocation] = useState<
    Building | undefined
  >();
  const selectLocation = (location: Building) => {
    setSelectedLocation(location);
  };

  return (
    <>
      <Map
        selectedLocation={selectedLocation}
        origin={yaleUni}
        buildings={buildings}
      />
      <View style={styles.header}>
        <Search locations={buildings} selectLocation={selectLocation} />
        <Profile />
      </View>
      <Shortcut />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginTop: "12%",
    flex: 1,
    position: "absolute",
    justifyContent: "space-around",
  },
});
