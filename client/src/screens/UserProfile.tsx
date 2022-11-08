import {StyleSheet, Text, View} from "react-native";
import {YALE_HEX, YALIES_KEY} from "../constants";
import {useAuth} from "../contexts/Auth";
import {Button} from "react-native-elements";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../navigation/Navigation";
import {SetStateAction, useEffect, useState} from "react";

const fetch = require('node-fetch')

type UserProp = StackScreenProps<RootStackParamList, 'UserProfile'>;

export default function UserProfile({route, navigation}: UserProp) {
    const auth = useAuth();
    const [isLoading, setLoading] = useState(true);
    const [UserData, setUserData] = useState([]);
    const netid = auth.authData?.netId
    useEffect(() => {
        fetch('https://yalies.io/api/people', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + YALIES_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: netid,
                page: 1,
                page_size: 1
            })
        })
            .then((response: { json: () => any; }) => response.json())
            .then((json: SetStateAction<never[]>[]) => setUserData(json[0]))
            .catch((error: any) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

        return (
            <>
                <View style={styles.header}>
                    <Text style={styles.heading}>Hello, {UserData.first_name}</Text>
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
                        onPress={() => navigation.navigate('EditSchedule')}
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
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 40,
        backgroundColor: "white",
    },
    heading: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 0,
        width: 200,
    },
});
