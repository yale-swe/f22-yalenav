import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Map } from "./src/components";

import { API_ENDPOINT } from "./config";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      var authenticationResponse = true; // TODO: passport cas
      setIsAuthenticated(authenticationResponse);
    }
  }, []);

  return (
    <View style={styles.container}>
      {isAuthenticated && (
        <Map userLoc={undefined} reactNativeMap={false} mapboxMap={true} />
      )}
      {!isAuthenticated && <Text> Please log in </Text> && (
        <StatusBar style="auto" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
