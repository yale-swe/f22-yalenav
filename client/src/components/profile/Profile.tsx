import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import { AntDesign as Icon } from "@expo/vector-icons";
import { YALE_HEX } from "../../constants";
import { useAuth } from "../../contexts/Auth";

interface ProfileInterface {}

export const Profile: React.FC<ProfileInterface> = ({}: ProfileInterface) => {
  const auth = useAuth();
  return (
    <View style={styles.profileComponent}>
      <Button
        style={styles.profile}
        type="clear"
        title={auth.authData ? auth.authData.netId : "Sign In"}
        onPress={() => props.navigation.navigate('User Profile')}
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
