import { createStackNavigator } from "@react-navigation/stack";
import EditSchedule from "../screens/EditSchedule";
import HomeScreen from "../screens/HomeScreen";
import UserProfile from "../screens/UserProfile";
import { RootStackParamList } from "./Navigation";

export const Stack = createStackNavigator<RootStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="EditSchedule" component={EditSchedule} />
    </Stack.Navigator>
  );
}
