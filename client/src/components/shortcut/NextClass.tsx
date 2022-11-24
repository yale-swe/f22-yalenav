import { Ionicons as Icon } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { User } from "../../../types";
import { YALE_HEX } from "../../constants";
import { useAuth } from "../../contexts/Auth";
import { getUser, nextClass } from "../../utils";

interface NextClassInterface {
  selectNextClass: Function;
}

export const NextClass: React.FC<NextClassInterface> = ({
  selectNextClass,
}: NextClassInterface) => {
  // temp
  const auth = useAuth();
  const [profile, setProfile] = useState<User | undefined>(undefined);
  useEffect(() => {
    const netid = auth.authData?.netId ?? "";
    const updateProfile = async () => {
      const updatedProfile = await getUser(netid);
      if (updatedProfile) setProfile(updatedProfile);
    };
    updateProfile();
  }, [profile]);

  const updateMapLocation = (profile: User | undefined) => {
    if (!profile) {
      Alert.alert("Sign in to use this feature");
      return;
    }
    if (!profile.courses?.length) {
      Alert.alert(
        "Empty schedule... 📚",
        "Add courses by editing your schedule in profile settings."
      );
      return;
    }

    const myNextClass = nextClass(profile);

    if (!myNextClass) {
      Alert.alert("No class today... 🏝", "Time to relax.");
      return;
    }

    selectNextClass(myNextClass);
  };

  return (
    <Button
      style={styles.nextClass}
      type="clear"
      icon={<Icon name="book-outline" size={24} color={YALE_HEX} />}
      onPress={() => {
        updateMapLocation(profile);
      }}
    />
  );
};

const styles = StyleSheet.create({
  nextClass: {
    padding: "2%",
    backgroundColor: "white",
  },
});
