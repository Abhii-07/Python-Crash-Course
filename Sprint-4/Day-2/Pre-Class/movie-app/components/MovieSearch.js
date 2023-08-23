import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const MovieSearch = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for movies"
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Feather name="search" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#333',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 5,
    padding: 12,
    marginRight: 16,
  },
  searchButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 12,
  },
});

export default MovieSearch;
