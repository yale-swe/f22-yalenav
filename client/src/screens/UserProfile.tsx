import { StyleSheet, Text, View } from "react-native";
import { YALE_HEX, YALIES_KEY } from "../constants";
import { useAuth } from "../contexts/Auth";
import { Button } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/Navigation";
import { SetStateAction, useEffect, useState } from "react";
import { Ionicons as Icon } from "@expo/vector-icons";

const fetch = require("node-fetch");

type UserProp = StackScreenProps<RootStackParamList, "UserProfile">;

export default function UserProfile({ route, navigation }: UserProp) {
  const auth = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [UserData, setUserData] = useState([]);
  const netid = auth.authData?.netId;
  useEffect(() => {
    fetch("https://yalies.io/api/people", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + YALIES_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: netid,
        page: 1,
        page_size: 1,
      }),
    })
      .then((response: { json: () => any }) => response.json())
      .then((json: SetStateAction<never[]>[]) => setUserData(json[0]))
      .catch((error: any) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <View style={styles.view}>
        <Text style={styles.heading}>Hey, {UserData.first_name} 👋</Text>
        <Text style={styles.info}>
          {UserData.school}, {UserData.college}, {UserData.year}
        </Text>
        <View style={styles.selection}>
          <Button
            style={styles.profile}
            type="clear"
            title="Edit Schedule"
            onPress={() => navigation.navigate("EditSchedule")}
          />
          <Button
            style={styles.profile}
            type="clear"
            title="Sign Out"
            onPress={() => auth.signOut()}
          />
          <Button
            style={styles.profile}
            type="clear"
            icon={<Icon name="home" size={24} color={YALE_HEX} />}
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    maxWidth: 400,
    display: "flex",
    backgroundColor: "white",
    padding: 20,
  },
  profile: {
    borderColor: YALE_HEX,
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 40,
    backgroundColor: "white",
    padding: 7,
  },
  heading: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    width: 200,
    padding: 20,
  },
  info: {
    textAlign: "center",
    width: 200,
    padding: 10,
  },
  selection: {
    padding: 20,
  },
});
