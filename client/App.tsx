import { LogBox } from "react-native";
import { AuthProvider } from "./src/contexts/Auth";
import Navigation from "./src/navigation/Navigation";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
