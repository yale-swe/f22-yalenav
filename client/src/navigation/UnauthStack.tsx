import { StyleSheet, View } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from "../components/auth/SignInScreen";

const Stack = createNativeStackNavigator();

export default function UnauthStack() {
    return (
            <Stack.Navigator initialRouteName="Sign In" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Sign In" component={SignInScreen} />
        </Stack.Navigator>
);
}
