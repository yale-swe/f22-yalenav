import { StyleSheet, View } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "../screens/HomeScreen";
import UserProfile from "../screens/UserProfile";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="User Profile" component={UserProfile} />
        </Stack.Navigator>
    );
}
