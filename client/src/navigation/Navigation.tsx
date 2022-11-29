import { NavigationContainer } from "@react-navigation/native";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { User } from "../../types";
import { useAuth } from "../contexts/Auth";
import AuthStack from "./AuthStack";
import UnauthStack from "./UnauthStack";

export type RootStackParamList = {
  Home: undefined;
  EditSchedule: { user: User };
  UserProfile: undefined;
  SignInScreen: undefined;
};

export const Navigation = () => {
  const auth = useAuth();
  return (
    <NavigationContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {auth.authData ? <AuthStack /> : <UnauthStack />}
      </TouchableWithoutFeedback>
    </NavigationContainer>
  );
};

export default Navigation;
