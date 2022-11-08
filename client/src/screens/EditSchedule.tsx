import {ScrollView, StyleSheet, Text, View} from "react-native";
import {YALE_HEX} from "../constants";
import {useAuth} from "../contexts/Auth";
import {Button} from "react-native-elements";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../navigation/Navigation";
import {ScheduleForm} from "../components/schedule/ScheduleForm";


type EditProp = NativeStackScreenProps<RootStackParamList, 'EditSchedule'>;

export default function EditSchedule({route, navigation}: EditProp) {
    const auth = useAuth();
    return (
        <>
            <ScrollView contentContainerStyle={styles.header}
                        keyboardShouldPersistTaps='handled'>
                <Text style={styles.heading}>Edit Schedule</Text>
                <ScheduleForm />
                <Button
                    style={styles.profile}
                    type="clear"
                    title="Back"
                    onPress={() => navigation.navigate('UserProfile')}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                />
            </ScrollView>
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
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 20,
        marginTop: 10,
        width: 200,
    },

});
