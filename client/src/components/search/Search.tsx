import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { YALE_HEX } from "../../constants";

interface SearchInterface {}

export const Search: React.FC<SearchInterface> = ({}: SearchInterface) => {
  // state to capture the search term for which the user should receive results
  const [search, setSearch] = useState("");

  const updateSearch = (text: string) => setSearch(text);

  return (
    <View style={styles.searchComponent}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for Yale destination..."
        onChangeText={updateSearch}
        value={search}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchComponent: {
    padding: "2%",
    paddingLeft: "4%",
    flex: 1,
  },
  searchBar: {
    padding: "4%",
    paddingLeft: "10%",
    paddingRight: "10%",
    borderColor: YALE_HEX,
    borderWidth: 2,
    borderRadius: 40,
    backgroundColor: "white",
  },
});
