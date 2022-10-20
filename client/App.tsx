import { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";

import { AuthProvider, useAuth } from "./src/contexts/Auth";
import Navigation from './src/screens/Navigation';

export default function App() {
  
  return (
    

      <SafeAreaView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <AuthProvider>
            <Navigation />
          </AuthProvider>
          </TouchableWithoutFeedback>
     
      </SafeAreaView>
      

    
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
