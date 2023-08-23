import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // Call the parent component's search function with searchText
    onSearch(searchText);
  };

  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Enter movie title"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <Button title="Search" onPress={handleSearch} color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ff3b30', // Red background for search bar
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
});

export default SearchBar;
