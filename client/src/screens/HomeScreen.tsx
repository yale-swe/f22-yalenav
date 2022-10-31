import { useState, useEffect } from "react";
import {Keyboard, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import axios from "axios";
import { Building } from "../../types";

import { Map, Search, Shortcut } from "../components";
import {BACKEND, YALE_HEX} from "../constants";
import { useAuth } from "../contexts/Auth";
import {Button} from "react-native-elements";
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from "../navigation/Navigation";
import {StackNavigationProp} from "@react-navigation/stack";
import type {StackScreenProps} from "@react-navigation/stack";

type HomeProp = StackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ route, navigation }: HomeProp) {
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
      <Map selectedLocation={selectedLocation}/>
      <View style={styles.header}>
        <Search locations={buildings} selectLocation={selectLocation} />
        {auth.authData ? <Button
            style={styles.profile}
            type="clear"
            title={auth.authData.netId}
            onPress={() => navigation.navigate('UserProfile')}
        /> : <Button
            style={styles.profile}
            type="clear"
            title="Sign In"
            onPress={() => navigation.navigate('SignIn')}
        />}
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
  profile: {
    borderColor: YALE_HEX,
    borderWidth: 2,
    borderRadius: 40,
    backgroundColor: "white",
  },
});
