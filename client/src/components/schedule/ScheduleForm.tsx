import {React, useState} from 'react';
import {Text, View, TextInput, StyleSheet, ScrollView} from 'react-native';
import {YALE_HEX} from "../../constants";
import {Button, CheckBox, Input} from "react-native-elements";



export const ScheduleForm = () => {
    const [mon, setMon] = useState(false);
    const [tue, setTue] = useState(false);
    const [wed, setWed] = useState(false);
    const [thu, setThu] = useState(false);
    const [fri, setFri] = useState(false);
    return (
        <View>
            <TextInput style={styles.form} placeholder="Course Code"/>
            <TextInput style={styles.form} placeholder="Start Time"/>
            <TextInput style={styles.form} placeholder="End Time"/>
            <TextInput style={styles.form} placeholder="Building Code"/>
            <CheckBox title='Monday' checked={mon} onPress={() => setMon(!mon)} checkedColor={YALE_HEX}/>
            <CheckBox title='Tuesday' checked={tue} onPress={() => setTue(!tue)} checkedColor={YALE_HEX}/>
            <CheckBox title='Wednesday' checked={wed} onPress={() => setWed(!wed)} checkedColor={YALE_HEX}/>
            <CheckBox title='Thursday' checked={thu} onPress={() => setThu(!thu)} checkedColor={YALE_HEX}/>
            <CheckBox title='Friday' checked={fri} onPress={() => setFri(!fri)} checkedColor={YALE_HEX}/>
            <Button
                title={'Submit'}
                buttonStyle={{
                    borderRadius: 30,
                    backgroundColor: YALE_HEX
                }}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 60,
        alignItems: "center",
    },
    form: {
        textAlign: 'center',
        fontSize: 18,
        borderColor: YALE_HEX,
        borderWidth: 2,
        borderRadius: 50,
        marginTop:5,
        marginBottom: 5,
        padding: 8,
    },
    form_title: {
        textAlign: 'center',
        fontSize: 18,
    },
});
