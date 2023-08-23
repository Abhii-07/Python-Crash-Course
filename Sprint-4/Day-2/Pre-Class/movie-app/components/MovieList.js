import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const MovieList = ({ movies, onMoviePress }) => {
  return (
    <FlatList
      data={movies}
      numColumns={2} // Display two columns
      keyExtractor={(item) => item.imdbID}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.movieCard}
          onPress={() => onMoviePress(item)}
        >
          <Image source={{ uri: item.Poster }} style={styles.poster} />
          <Text style={styles.title}>{item.Title}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000', // Dark background
  },
  movieCard: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  poster: {
    width: 150,
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
});

export default MovieList;
