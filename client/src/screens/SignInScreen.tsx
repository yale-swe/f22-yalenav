import type { StackScreenProps } from "@react-navigation/stack";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { YALE_HEX } from "../constants";
import { useAuth } from "../contexts/Auth";
import { signInScreenStyle } from "../css/styles";
import { RootStackParamList } from "../navigation/Navigation";

type SignInProp = StackScreenProps<RootStackParamList, "Home">;

export default function SignInScreen({ route, navigation }: SignInProp) {
  const auth = useAuth();
  const Logo = require("../../assets/yalenav.png");

  const handleSignInPress = async () => {
    auth.signIn();
  };

  return (
    <View style={signInScreenStyle.header}>
      <View style={signInScreenStyle.view}>
        <View style={signInScreenStyle.logo}>
          <Image style={{ width: 110, height: 120 }} source={Logo} />
        </View>
        <TouchableOpacity
          style={signInScreenStyle.signIn}
          onPress={handleSignInPress}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={signInScreenStyle.noSignIn}
          onPress={() => navigation.navigate("Home")}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: YALE_HEX,
            }}
          >
            Maybe Later
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
