import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { AntDesign as Icon } from "@expo/vector-icons";
import { YALE_HEX } from "../../constants";

interface ProfileInterface {}

export const Profile: React.FC<ProfileInterface> = ({}: ProfileInterface) => {
  return (
    <View style={styles.profileComponent}>
      <Button
        style={styles.profile}
        type="clear"
        icon={<Icon name="user" size={33} color={YALE_HEX} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileComponent: {
    padding: "2%",
    paddingRight: "4%",
  },
  profile: {
    borderColor: YALE_HEX,
    borderWidth: 2,
    borderRadius: 40,
    backgroundColor: "white",
  },
});
