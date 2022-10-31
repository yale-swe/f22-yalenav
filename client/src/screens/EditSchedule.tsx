import { useState, useEffect } from "react";
import {StyleSheet, Text, View} from "react-native";
import axios from "axios";
import { Building } from "../../types";

import { Map, Search, Shortcut } from "../components";
import {BACKEND, YALE_HEX} from "../constants";
import { useAuth } from "../contexts/Auth";
import {Button} from "react-native-elements";

// @ts-ignore
export default function EditSchedule({ navigation }) {
    const auth = useAuth();
    return (
        <>
            <View style={styles.header}>
                <Text style={styles.heading}>Edit Schedule Placeholder</Text>
                <Button
                    style={styles.profile}
                    type="clear"
                    title="Done"
                    onPress={() => navigation.navigate('User Profile')}
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
