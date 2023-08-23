import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const MovieDetail = ({ movie }) => {
  return (
    <ScrollView style={styles.movieDetailContainer}>
      <Image
        source={{ uri: movie.Poster }}
        style={styles.moviePosterDetail}
      />
      <Text style={styles.movieTitleDetail}>{movie.Title}</Text>
      <Text>Released: {movie.Released}</Text>
      <Text>Plot: {movie.Plot}</Text>
      <Text>Ratings: {movie.Ratings.map((rating) => rating.Value).join(', ')}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  movieDetailContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  moviePosterDetail: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  movieTitleDetail: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default MovieDetail;
