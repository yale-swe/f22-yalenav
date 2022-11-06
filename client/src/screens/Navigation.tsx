import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
} from "react-native";
import { useAuth } from "../contexts/Auth";
import SignInScreen from "../components/auth/SignInScreen";
import HomeScreen from "./HomeScreen";

const Navigation = () => {
  const auth = useAuth();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {auth.authData ? <HomeScreen /> : <SignInScreen />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default Navigation;
