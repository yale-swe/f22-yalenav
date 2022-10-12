import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Map } from "./src/components";

import { API_ENDPOINT } from "./config";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      var authenticationResponse = false; // TODO: passport cas
      setIsAuthenticated(authenticationResponse);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Map userLoc={undefined} reactNativeMap={false} mapboxMap={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
