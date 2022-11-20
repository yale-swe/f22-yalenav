import { SetStateAction, useEffect, useState } from "react";
import { FlatList, Keyboard, StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { Building } from "../../../types";
import { YALE_HEX } from "../../constants";
import { searchFilterBuildings } from "../../utils";
import { SearchResult } from "./SearchResult";

interface SearchInterface {
  locations: Building[];
  selectLocation: Function;
}

export const Search: React.FC<SearchInterface> = ({
  locations,
  selectLocation,
}: SearchInterface) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [queryComplete, setQueryComplete] = useState<Boolean>(false);
  const [resultsVisible, setResultsVisible] = useState<Boolean>(false);

  const onChangeSearch = (query: SetStateAction<string>) => {
    setQueryComplete(false);
    setSearchQuery(query);
  };

  const onDoneSearch = (location: Building) => {
    selectLocation(location);
    // update search bar input
    setSearchQuery(location.name);
    Keyboard.dismiss();
    setQueryComplete(true);
  };

  const [filteredLocations, setFilteredLocations] = useState<Building[]>([]);

  useEffect(() => {
    // results should be visible (1) search query is non-empty, (2) not done searching
    setResultsVisible(searchQuery && !queryComplete ? true : false);

    const updatedLocations = locations.filter((location) => {
      // utils function to filter the terms
      return searchFilterBuildings(location, searchQuery);
    });

    setFilteredLocations(updatedLocations);
  }, [searchQuery, queryComplete]);

  return (
    <View style={styles.searchComponent}>
      <Searchbar
        autoCorrect={false}
        style={styles.searchBar}
        inputStyle={{ fontSize: 13 }}
        placeholder="Search for a Yale Location..."
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {resultsVisible && (
        <FlatList
          style={styles.resultsComponent}
          data={filteredLocations}
          renderItem={({ item }) => (
            <SearchResult
              obj={item}
              title={item.name}
              info={item.address}
              onDoneSearch={onDoneSearch}
            />
          )}
          keyExtractor={(item) => item._id}
        />
      )}
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
    elevation: 0,
    borderColor: YALE_HEX,
    borderWidth: 2,
    borderRadius: 40,
    backgroundColor: "white",
  },
  resultsComponent: {
    paddingLeft: "4%",
    paddingRight: "4%",
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255, 0.8)",
  },
});
