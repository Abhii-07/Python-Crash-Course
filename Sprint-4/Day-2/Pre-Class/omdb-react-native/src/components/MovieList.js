import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const MovieList = ({ movies, onMoviePress }) => {
  return (
    <View>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onMoviePress(item.imdbID)}
            style={styles.movieItem}
          >
            <Image
              source={{ uri: item.Poster }}
              style={styles.moviePoster}
            />
            <Text style={styles.movieTitle}>{item.Title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 2, // Shadow for Android
    shadowColor: 'black', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  moviePoster: {
    width: 50,
    height: 75,
    marginRight: 8,
  },
  movieTitle: {
    fontSize: 16,
  },
});

export default MovieList;
