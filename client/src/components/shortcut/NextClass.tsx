import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons as Icon } from "@expo/vector-icons";
import { YALE_HEX } from "../../constants";

interface NextClassInterface {}

export const NextClass: React.FC<
  NextClassInterface
> = ({}: NextClassInterface) => {
  return (
    <View style={styles.footer}>
      <Button
        style={styles.nextClass}
        type="clear"
        icon={<Icon name="book-outline" size={24} color={YALE_HEX} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: "190%",
    flex: 1,
    position: "absolute",
  },
  nextClass: {
    padding: "6%",
    borderColor: YALE_HEX,
    borderWidth: 2,
    borderRadius: 40,
    backgroundColor: "white",
  },
});
