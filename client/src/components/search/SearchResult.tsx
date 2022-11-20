import { Pressable, StyleSheet, Text, View } from "react-native";

interface SearchResultInterface {
  obj: any;
  title: string;
  info: string;
  onDoneSearch: Function;
}

export const SearchResult: React.FC<SearchResultInterface> = ({
  obj,
  title,
  info,
  onDoneSearch,
}: SearchResultInterface) => {
  const fadedBlue = "rgba(210, 230, 255, 0.8)";
  const fadedWhite = "rgba(255,255,255, 0.8)";
  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? fadedBlue : fadedWhite,
            borderRadius: 10,
          },
        ]}
        onPress={() => onDoneSearch(obj)}
      >
        <Text style={styles.resultTitle}>{title}</Text>
        <Text style={styles.resultInfo}>{info}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  resultTitle: {
    padding: "4%",
    paddingBottom: 0,
    fontSize: 12,
    fontWeight: "bold",
  },
  resultInfo: {
    paddingTop: 0,
    padding: "4%",
    fontSize: 8,
  },
});
