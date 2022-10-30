import { useState, useEffect } from "react";
import {StyleSheet, Text, View} from "react-native";
import axios from "axios";
import { Building } from "../../types";

import { Map, Profile, Search, Shortcut } from "../components";
import {BACKEND, YALE_HEX} from "../constants";
import { useAuth } from "../contexts/Auth";
import {Button} from "react-native-elements";

export default function UserProfile({ navigation }) {
    const auth = useAuth();
    return (
        <>
            <View style={styles.header}>
                <Text>Profile</Text>
                <Button
                    style={styles.profile}
                    type="clear"
                    title={auth.authData ? auth.authData.netId : "Go Back"}
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        marginTop: "12%",
        flex: 1,
        position: "absolute",
        justifyContent: "space-around",
    },
    profile: {
        borderColor: YALE_HEX,
        borderWidth: 2,
        borderRadius: 40,
        backgroundColor: "white",
    },
});
