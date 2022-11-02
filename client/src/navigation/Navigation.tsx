import {Keyboard, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {useAuth} from "../contexts/Auth";
import AuthStack from "./AuthStack";
import UnauthStack from "./UnauthStack";
import {NavigationContainer} from "@react-navigation/native";

export type RootStackParamList = {
    Home: undefined;
    EditSchedule: undefined;
    UserProfile: undefined;
    SignIn: undefined;
};

const Navigation = () => {
    const auth = useAuth();
    return (
        <NavigationContainer>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {auth.authData ? <AuthStack/> : <UnauthStack/>}
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
