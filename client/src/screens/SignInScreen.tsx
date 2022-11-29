import type { StackScreenProps } from "@react-navigation/stack";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { YALE_HEX } from "../constants";
import { useAuth } from "../contexts/Auth";
import { RootStackParamList } from "../navigation/Navigation";

type SignInProp = StackScreenProps<RootStackParamList, "Home">;

export default function SignInScreen({ route, navigation }: SignInProp) {
  const auth = useAuth();
  const Logo = require("../../assets/yalenav.png");

  const handleSignInPress = async () => {
    auth.signIn();
  };

  return (
    <View style={styles.header}>
      <View style={styles.view}>
        <View style={styles.logo}>
          <Image style={{ width: 110, height: 120 }} source={Logo} />
        </View>
        <Pressable style={styles.signIn} onPress={handleSignInPress}>
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
            }}
          >
            Sign In
          </Text>
        </Pressable>
        <Pressable
          style={styles.noSignIn}
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
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: "12%",
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
    display: "flex",
    backgroundColor: "white",
  },
  signIn: {
    width: "75%",
    padding: 20,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
    backgroundColor: YALE_HEX,
    marginBottom: 20,
  },
  noSignIn: {
    width: "75%",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
    backgroundColor: "white",
    borderColor: YALE_HEX,
    borderWidth: 2,
  },
  view: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    padding: 25,
  },
  logo: {
    padding: 20,
  },
  back: {
    color: YALE_HEX,
    borderColor: YALE_HEX,
    borderRadius: 40,
    backgroundColor: "white",
  },
});
