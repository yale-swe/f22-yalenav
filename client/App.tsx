import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { Map, Profile, Search, Shortcut } from "./src/components";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      var authenticationResponse = false; // TODO: passport cas
      setIsAuthenticated(authenticationResponse);
    }
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Map />
        <View style={styles.header}>
          <Search />
          <Profile />
        </View>
        <Shortcut />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    marginTop: "20%",
    flex: 1,
    position: "absolute",
    justifyContent: "space-around",
  },
});
