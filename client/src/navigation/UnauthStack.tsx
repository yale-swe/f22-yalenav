import SignInScreen from "../components/auth/SignInScreen";
import HomeScreen from "../screens/HomeScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {RootStackParamList} from "./Navigation";

export const Stack = createStackNavigator<RootStackParamList>();

export default function UnauthStack() {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="SignIn" component={SignInScreen} />
        </Stack.Navigator>
);
}
