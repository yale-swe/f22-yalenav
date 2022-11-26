import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { ScheduleForm } from "../components/schedule/ScheduleForm";
import { YALE_HEX } from "../constants";
import { RootStackParamList } from "../navigation/Navigation";

type EditProp = NativeStackScreenProps<RootStackParamList, "EditSchedule">;

export default function EditSchedule({ route, navigation }: EditProp) {
  const user = route.params.user;
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row" }}>
        <Button
          style={styles.back}
          type="clear"
          title="←"
          onPress={() => navigation.goBack()}
          containerStyle={{
            width: "20%",
          }}
        />
        <Text style={styles.heading}>Edit Schedule</Text>
      </View>
      <ScheduleForm user={user} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: "12%",
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
    display: "flex",
    backgroundColor: "white",
  },
  back: {
    color: YALE_HEX,
    borderColor: YALE_HEX,
    borderRadius: 40,
    backgroundColor: "white",
    alignSelf: "center",
  },
  heading: {
    width: "80%",
    marginTop: 30,
    marginBottom: 20,
    padding: "15%",
    fontWeight: "bold",
    fontSize: 18,
    paddingVertical: 15,
  },
});
