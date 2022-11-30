import { StyleSheet, View } from "react-native";
import { YALE_HEX } from "../../constants";
import { NextClass } from "../shortcut/NextClass";
import { navigationBarStyle } from "../../css/styles";

interface NavigationBarInterface {
  selectNextClass: Function;
}

export const NavigationBar: React.FC<NavigationBarInterface> = ({
  selectNextClass,
}: NavigationBarInterface) => {
  return (
    <View style={navigationBarStyle.footer}>
      <NextClass selectNextClass={selectNextClass} />
    </View>
  );
};
