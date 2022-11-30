import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import { ScheduleForm } from "../components/schedule/ScheduleForm";
import { RootStackParamList } from "../navigation/Navigation";
import { editScheduleStyle } from "../css/styles";

type EditProp = NativeStackScreenProps<RootStackParamList, "EditSchedule">;

export default function EditSchedule({ route, navigation }: EditProp) {
  const user = route.params.user;
  return (
    <View style={editScheduleStyle.header}>
      <View style={{ flexDirection: "row" }}>
        <Button
          style={editScheduleStyle.back}
          type="clear"
          title="←"
          onPress={() => navigation.goBack()}
          containerStyle={{
            width: "20%",
          }}
        />
        <Text style={editScheduleStyle.heading}>Edit Schedule</Text>
      </View>
      <ScheduleForm user={user} />
    </View>
  );
}
