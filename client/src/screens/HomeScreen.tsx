import type { StackScreenProps } from "@react-navigation/stack";
import axios from "axios";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Building, Course, LatLng } from "../../types";
import { Map, NavigationBar, Search } from "../components";
import { CampusSpots } from "../components/search/CampusSpots";
import { BACKEND, YALE_HEX } from "../constants";
import { useAuth } from "../contexts/Auth";
import { RootStackParamList } from "../navigation/Navigation";
import { getCourseLocation } from "../utils";
import { collegesAbbr, diningHallAbbr } from "../utils/campusSpots";

type HomeProp = StackScreenProps<RootStackParamList, "Home">;

var yaleUni = {
  latitude: 41.3163,
  longitude: -72.922585,
};

export default function HomeScreen({ route, navigation }: HomeProp) {
  const [origin, setOrigin] = useState<LatLng>();

  const auth = useAuth();
  // Load Yale locations
  const [buildings, setBuildings] = useState<Building[]>([]);

  const [buildingsToRender, setBuildingsToRender] =
    useState<Array<Building>>(buildings);

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
        console.log("Location access granted!");
        let loc = await Location.getCurrentPositionAsync({});
        setOrigin({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
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
        setBuildingsToRender(res.data.buildings);
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

  const selectNextClass = (course: Course | undefined) => {
    if (!course) return;
    // find course based on rendered buildings
    const courseBuilding = getCourseLocation(course, buildings);
    if (!courseBuilding) return;
    selectLocation(courseBuilding);
  };

  return (
    <>
      <Map
        selectedLocation={selectedLocation}
        origin={origin}
        buildings={buildingsToRender}
      />
      <View style={styles.header}>
        <View style={{ maxWidth: "80%" }}>
          <Search locations={buildings} selectLocation={selectLocation} />
          <View style={{ paddingLeft: "4%" }}>
            <CampusSpots
              allBuildings={buildings}
              setBuildingsToRender={setBuildingsToRender}
              libraryBuildings={buildings.filter(
                (value: Building) => value.type == "LIBRARY"
              )}
              collegeBuildings={buildings.filter(
                (value: Building) =>
                  collegesAbbr.indexOf(value.abbreviation) > 0
              )}
              diningHallBuildings={buildings.filter(
                (value: Building) =>
                  diningHallAbbr.indexOf(value.abbreviation) > 0
              )}
            />
          </View>
        </View>
        <View style={{ maxWidth: "20%", paddingTop: "2%" }}>
          <Pressable
            style={styles.profile}
            onPress={
              auth.authData
                ? () => navigation.navigate("UserProfile")
                : () => navigation.navigate("SignInScreen")
            }
          >
            <Text
              style={{
                color: YALE_HEX,
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              {auth.authData ? auth.authData.netId.toString() : "Sign In"}
            </Text>
          </Pressable>
        </View>
      </View>
      <NavigationBar selectNextClass={selectNextClass} />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingTop: "12%",
    flex: 1,
    position: "absolute",
    justifyContent: "space-between",
  },
  profile: {
    borderColor: YALE_HEX,
    borderWidth: 2,
    borderRadius: 40,
    backgroundColor: "white",
    fontSize: 10,
    padding: "15%",
    paddingVertical: "22%",
  },
});
