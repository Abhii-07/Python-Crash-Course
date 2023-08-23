import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const MovieDetails = ({ movie, onBackPress }) => {
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: movie.Poster }} style={styles.posterImage} />
      <Text style={styles.title}>{movie.Title}</Text>
      <Text style={styles.rating}>IMDb Id: {movie.imdbID}</Text>
      {movie.Year && <Text style={styles.year}>Year: {movie.Year}</Text>}
      {movie.Type && <Text style={styles.type}>Type: {movie.Type}</Text>}
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <View style={styles.backButtonContainer}>
          <Text style={styles.backButtonText}>Back to Home</Text>
        </View>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Dark background
  },
  posterImage: {
    width: '100%',
    height: 400, // Increased height for a larger image
    resizeMode: 'cover',
    borderRadius: 10, // Rounded corners for the image
  },
  title: {
    fontSize: 28, // Larger font size for the title
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#fff',
  },
  year: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  plot: {
    fontSize: 16,
    marginVertical: 16,
    color: '#fff',
  },
  rating: {
    fontSize: 18, // Larger font size for the rating
    fontWeight: 'bold',
    color: '#fff',
  },
  backButton: {
    marginTop: 20, // Added margin to separate the button from the text
  },
  backButtonText: {
    fontSize: 18, // Larger font size for the button text
    color: 'white',

  },backButton: {
    marginTop: 20,
    alignItems: 'center', // Center the button horizontally
  },
  backButtonContainer: {
    backgroundColor: '#007AFF', // Blue background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MovieDetails;
