import { StyleSheet, View } from "react-native";
import { YALE_HEX } from "../../constants";
import { NextClass } from "../shortcut/NextClass";

interface NavigationBarInterface {
  selectNextClass: Function;
}

export const NavigationBar: React.FC<NavigationBarInterface> = ({
  selectNextClass,
}: NavigationBarInterface) => {
  return (
    <View style={styles.footer}>
      <NextClass selectNextClass={selectNextClass} />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    zIndex: 999,
    shadowColor: "black",
    shadowRadius: 20,
    marginTop: "197%",
    flex: 1,
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "white",
    borderColor: YALE_HEX,
    borderWidth: 2,
    width: "120%",
    height: "100%",
  },
});
