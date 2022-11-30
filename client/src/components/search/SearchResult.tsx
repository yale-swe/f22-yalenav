import { Pressable, Text, View } from "react-native";
import { searchResultStyle } from "../../css/styles";

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
        <Text style={searchResultStyle.resultTitle}>{title}</Text>
        <Text style={searchResultStyle.resultInfo}>{info}</Text>
      </Pressable>
    </View>
  );
};
