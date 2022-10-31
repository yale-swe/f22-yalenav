import HomeScreen from "../screens/HomeScreen";
import UserProfile from "../screens/UserProfile";
import EditSchedule from "../screens/EditSchedule";
import {RootStackParamList} from "./Navigation"
import {createStackNavigator} from "@react-navigation/stack";

export const Stack = createStackNavigator<RootStackParamList>();

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="UserProfile" component={UserProfile}/>
            <Stack.Screen name="EditSchedule" component={EditSchedule}/>
        </Stack.Navigator>
    );
}
