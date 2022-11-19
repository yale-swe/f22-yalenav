import { StyleSheet, Text, View } from "react-native";
import { YALE_HEX } from "../constants";
import { useAuth } from "../contexts/Auth";
import { Button } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/Navigation";
import { SetStateAction, useEffect, useState } from "react";
import { Ionicons as Icon } from "@expo/vector-icons";
import { User } from "../../types";
import { BACKEND } from "../constants";
import axios from "axios";

type UserProp = StackScreenProps<RootStackParamList, "UserProfile">;

export default function UserProfile({ route, navigation }: UserProp) {
  const auth = useAuth();
  const [profile, setProfile] = useState<User | undefined>(undefined);
  const netid = auth.authData?.netId ?? "";
  useEffect(() => {
    axios
      .get<{ user: User }>(`${BACKEND}/user?netid=${netid}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [BACKEND]);

  return (
    <>
      {profile && (
        <View style={styles.view}>
          <Text style={styles.heading}>Hey, {profile.first_name} 👋</Text>
          <Text style={styles.info}>
            {profile.school}, {profile.college}, {profile.year}
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
      )}
      {!profile && (
        <View style={styles.view}>
          <Text style={styles.heading}>Uh oh... 😬</Text>
          <Text style={styles.info}>
            Looks like we're having some trouble fetching your information.
          </Text>
        </View>
      )}
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
