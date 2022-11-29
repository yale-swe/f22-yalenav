import { Ionicons as Icon } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import { User } from "../../types";
import { YALE_HEX } from "../constants";
import { useAuth } from "../contexts/Auth";
import { RootStackParamList } from "../navigation/Navigation";
import { getUser } from "../utils";
import { userProfileStyle } from "../css/styles";

type UserProp = StackScreenProps<RootStackParamList, "UserProfile">;

export default function UserProfile({ route, navigation }: UserProp) {
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

  return (
    <View style={userProfileStyle.view}>
      {profile ? (
        <>
          <Text style={userProfileStyle.heading}>
            Hey, {profile.first_name} 👋
          </Text>
          <Text style={userProfileStyle.info}>
            {profile.school}, {profile.college}, {profile.year}
          </Text>
          <View style={userProfileStyle.selection}>
            <Button
              style={userProfileStyle.profile}
              type="clear"
              title="Edit Schedule"
              onPress={() =>
                navigation.navigate("EditSchedule", { user: profile })
              }
            />
            <Button
              style={userProfileStyle.profile}
              type="clear"
              title="Sign Out"
              onPress={() => auth.signOut()}
            />
            <Button
              style={userProfileStyle.profile}
              type="clear"
              icon={<Icon name="home" size={24} color={YALE_HEX} />}
              onPress={() => navigation.navigate("Home")}
            />
          </View>
        </>
      ) : (
        <>
          <Text style={userProfileStyle.heading}>Uh oh... 😬</Text>
          <Text style={userProfileStyle.info}>
            Looks like we're having some trouble fetching your information.
          </Text>
        </>
      )}
    </View>
  );
}
