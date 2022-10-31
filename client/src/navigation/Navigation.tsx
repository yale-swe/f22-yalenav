import {TouchableWithoutFeedback, StyleSheet, View, Keyboard} from "react-native";
import { useAuth } from "../contexts/Auth";
import SignInScreen from "../components/auth/SignInScreen";
import HomeScreen from "../screens/HomeScreen";
import AuthStack from "./AuthStack";
import UnauthStack from "./UnauthStack";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const auth = useAuth();
  return (
      <NavigationContainer>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {auth.authData ? <AuthStack />: <UnauthStack />}
        </TouchableWithoutFeedback>
      </NavigationContainer>
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
