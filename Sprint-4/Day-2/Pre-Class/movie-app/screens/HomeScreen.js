import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { Header, SearchBar } from 'react-native-elements';
import axios from 'axios';
import { FlatList } from 'react-native';

import MovieList from '../components/MovieList';
import MovieDetails from '../components/MovieDetails';
import LoadingIndicator from '../components/LoadingIndicator';
import Swiper from 'react-native-swiper';

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchMovies = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${query}&apikey=86c0187`
      );

      if (response.data.Search) {
        const extractedMovies = response.data.Search.map((movie) => ({
          imdbID: movie.imdbID,
          Title: movie.Title,
          Poster: movie.Poster,
        }));

        setMovies(extractedMovies);
      } else {
        setMovies([]);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies: ', error);
      setLoading(false);
    }
  };

  const handleMoviePress = (movie) => {
    setSelectedMovie(movie);
  };

  const toggleMovieDetails = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{ text: 'Movie Discovery App - OMDB API', style: { color: '#fff' } }}
        backgroundColor="#333"
      />

      <SearchBar
        placeholder="Search for movies"
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        onSubmitEditing={() => searchMovies(searchText)}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchInputContainer}
      />

      {loading ? (
        <LoadingIndicator visible={loading} />
      ) : selectedMovie ? (
        <MovieDetails movie={selectedMovie} onBackPress={() => toggleMovieDetails(null)} />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item }) => (
            <MovieList movies={movies} onMoviePress={toggleMovieDetails} />
          )}
          ListHeaderComponent={
            selectedMovie === null ? (
              <View style={styles.swiperContainer}>
                <Swiper
                  style={styles.carousel}
                  showsPagination={false} // Remove the pagination dots if not needed
                  autoplay // Auto play the carousel
                  autoplayTimeout={3} // Auto play every 3 seconds
                >
                  <Image
                    source={require('../assets/image3.jpg')} // Use the same image for demonstration
                    style={styles.carouselImage}
                    resizeMode="cover"
                  />
                  <Image
                    source={require('../assets/placeholder1.jpg')} // Use the placeholder1 image from assets
                    style={styles.carouselImage}
                    resizeMode="cover"
                  />
                  <Image
                    source={require('../assets/image2.jpg')} // Use the same image for demonstration
                    style={styles.carouselImage}
                    resizeMode="cover"
                  />
                  {/* Add more images here as needed */}
                </Swiper>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Dark background
  },
  searchContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchInputContainer: {
    backgroundColor: '#333', // Dark input field
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 5,
  },
  searchBarContainer: {
    backgroundColor: '#333', // Dark background for search bar
    borderBottomWidth: 0, // Remove the border at the bottom of the search bar
  },
  swiperContainer: {
    marginVertical: 10, // Add margin to reduce the gap
  },
  carousel: {
    height: 200,
  },
  carouselImage: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});

export default HomeScreen;
