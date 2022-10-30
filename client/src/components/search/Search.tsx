import { useState, useEffect, SetStateAction } from "react";
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  FlatList,
  TouchableOpacity, TouchableWithoutFeedback,
} from "react-native";
import { YALE_HEX } from "../../constants";
import { Searchbar } from "react-native-paper";
import { Building } from "../../../types";
import { searchFilter } from "../../utils";
import {Keyboard} from 'react-native'

interface SearchInterface {
  locations: Building[];
  selectLocation(location: Building): any;
}

export const Search: React.FC<SearchInterface> = ({
  locations,
  selectLocation,
}: SearchInterface) => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query: SetStateAction<string>) =>
    setSearchQuery(query);

  const [filteredLocations, setFilteredLocations] = useState<Building[]>([]);

  useEffect(() => {
    const updatedLocations = locations.filter((location) => {
      // utils function to filter the terms
      return searchFilter(location, searchQuery);
    });
    setFilteredLocations(updatedLocations);
  }, [searchQuery]);

  const Result = ({ location }: { location: Building }) => (
    <View>
      <TouchableOpacity>
        <Pressable onPress={() => selectLocation(location)}>
          <Text style={styles.resultComponent}>{location.name}</Text>
        </Pressable>
      </TouchableOpacity>
    </View>
  );

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
      <FlatList
        style={styles.resultsComponent}
        data={filteredLocations}
        renderItem={({ item }) => <Result location={item} />}
        keyExtractor={(item) => item._id}
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
  resultComponent: {
    padding: "4%",
    fontSize: 15,
  },
});
