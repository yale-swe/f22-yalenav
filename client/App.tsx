import {AuthContext, AuthProvider, useAuth} from "./src/contexts/Auth";
import Navigation from './src/navigation/Navigation';
import {NavigationContainer} from "@react-navigation/native";


export default function App() {
    return (
        <AuthProvider>
            <Navigation />
        </AuthProvider>
  );
}
