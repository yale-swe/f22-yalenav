import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Button,
} from "react-native";
import axios from "axios";
import { Building } from "../../types";

import { Map, Profile, Search, Shortcut } from "../components";
import { BACKEND } from "../constants";
import {useAuth} from "../contexts/Auth";

export default function HomeScreen() {
    const auth = useAuth();
    // Load Yale locations
    const [buildings, setBuildings] = useState<Building[]>([]);

    useEffect(() => {
        axios
        .get<{ buildings: Building[] }>(`${BACKEND}/building`)
        .then((res) => {
            setBuildings(res.data.buildings);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [BACKEND]);

    // Select location of interest
    const [selectedLocation, setSelectedLocation] = useState<
        Building | undefined
    >();
    const selectLocation = (location: Building) => {
        setSelectedLocation(location);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Map selectedLocation={selectedLocation} />
            <View style={styles.header}>
                <Search locations={buildings} selectLocation={selectLocation} />
                <Profile />
            </View>
            <Shortcut />
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