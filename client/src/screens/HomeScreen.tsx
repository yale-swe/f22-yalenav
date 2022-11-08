import { useState, useEffect } from "react";
import { StyleSheet, View, Linking, Alert } from "react-native";
import axios from "axios";
import { Building } from "../../types";

import { Map, Profile, Search, Shortcut } from "../components";
import { BACKEND } from "../constants";
import { useAuth } from "../contexts/Auth";
import * as Location from "expo-location";

var yaleUni = {
  latitude: 41.3163,
  longitude: -72.922585,
};

export default function HomeScreen() {
  const [location, setLocation] = useState<Location>();

  const auth = useAuth();
  // Load Yale locations
  const [buildings, setBuildings] = useState<Building[]>([]);

  const getUserLocation = async () => {
    try {
      // Request for the users permissions for using their location
      let { status } = await Location.requestForegroundPermissionsAsync();
      // If the user does not allow our app to use their location then
      if (status !== "granted") {
        Alert.alert(
          "YaleNav Requires Your Location!",
          "For the full experience of using YaleNav, we require your location in order to perform the routing!"
        );
        return;
      } else {
        console.log("Location access granted!!");
        let loc = await Location.getCurrentPositionAsync({});
        console.log(loc);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

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
