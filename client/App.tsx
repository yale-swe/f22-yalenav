import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import axios from "axios";
import { Building } from "./types";

import { Map, Profile, Search, Shortcut } from "./src/components";

// TO CHANGE
const ipAddress = "172.27.177.182";

export default function App() {
  // Log in
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (!isAuthenticated) {
      var authenticationResponse = false; // TODO: passport cas
      setIsAuthenticated(authenticationResponse);
    }
  }, []);

  // Load Yale locations
  const [buildings, setBuildings] = useState<Building[]>([]);
  useEffect(() => {
    axios
      .get<{ buildings: Building[] }>(`http://${ipAddress}:4000/building`)
      .then((res) => {
        setBuildings(res.data.buildings);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ipAddress]);

  // Select location of interest
  const [selectedLocation, setSelectedLocation] = useState<
    Building | undefined
  >();
  const selectLocation = (location: Building) => {
    setSelectedLocation(location);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Map selectedLocation={selectedLocation} />
        <View style={styles.header}>
          <Search locations={buildings} selectLocation={selectLocation} />
          <Profile />
        </View>
        <Shortcut />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    marginTop: "20%",
    flex: 1,
    position: "absolute",
    justifyContent: "space-around",
  },
});
