import { useEffect, useState } from "react";
import { Alert, View, Pressable, Text } from "react-native";
import { User } from "../../../types";
import { YALE_HEX } from "../../constants";
import { useAuth } from "../../contexts/Auth";
import { homeScreenStyle } from "../../css/styles";
import { RootStackParamList } from "../../navigation/Navigation";
import type { StackScreenProps } from "@react-navigation/stack";

type ProfileProp = StackScreenProps<RootStackParamList, "Home">;

export const ProfileButton: React.FC<ProfileProp> = ({
  navigation,
}: ProfileProp) => {
  const auth = useAuth();

  return (
    <View style={{ maxWidth: "20%", paddingTop: "2%" }}>
      <Pressable
        style={homeScreenStyle.profile}
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
  );
};
