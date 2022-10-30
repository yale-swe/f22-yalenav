import { useState, useEffect } from "react";
import {StyleSheet, Text, View} from "react-native";
import axios from "axios";
import { Building } from "../../types";

import { Map, Search, Shortcut } from "../components";
import {BACKEND, YALE_HEX} from "../constants";
import { useAuth } from "../contexts/Auth";
import {Button} from "react-native-elements";

// @ts-ignore
export default function UserProfile({ navigation }) {
    const auth = useAuth();
    return (
        <>
            <View style={styles.header}>
                <Text style={styles.heading}>Hello, {auth.authData?.netId}</Text>
                <Button
                    style={styles.profile}
                    type="clear"
                    title="Go Home"
                    onPress={() => navigation.navigate('Home')}
                />

                <Button
                    style={styles.profile}
                    type="clear"
                    title="Sign Out"
                    onPress={() => auth.signOut()}
                />

                <Button
                    style={styles.profile}
                    type="clear"
                    title="Edit Schedule"
                    onPress={() => navigation.navigate('Edit Schedule')}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        flexDirection: "column",
        marginTop: "12%",
        flex: 1,
        justifyContent: "flex-start",
        maxWidth: 400,
    },
    profile: {
        borderColor: YALE_HEX,
        borderWidth: 2,
        borderRadius: 40,
        backgroundColor: "white",
    },
    heading: {
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 200,
    },
});
