import React, { useState, useEffect } from 'react';
import { View, Switch, SafeAreaView, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import MovieDetail from '../components/MovieDetail';
import styles from '../styles';

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to fetch movies based on search text
  const searchMovies = async () => {
    try {
      // Replace with your actual OMDB API endpoint and API key
      const apiKey = '86c0187';
      const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchText}`);
      const data = await response.json();
      
      if (data.Search) {
        setMovies(data.Search);
        setSelectedMovie(null); // Clear selected movie when new search is performed
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Function to fetch movie details by IMDb ID
  const fetchMovieDetails = async (imdbID) => {
    try {
      // Replace with your actual OMDB API endpoint and API key
      const apiKey = '86c0187';
      const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
      const movie = await response.json();
      
      setSelectedMovie(movie);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Load initial data or perform other setup actions on component mount
  useEffect(() => {
    // Example: Load initial data here if needed
  }, []);

  return (
    <SafeAreaView style={[styles.container, isDarkMode && { backgroundColor: '#111' }]}>
      <ScrollView>
        <View style={styles.searchBarContainer}>
          <SearchBar onSearch={searchMovies} />
        </View>
        
        <View style={styles.darkModeToggle}>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
          />
        </View>

        <View style={{ flex: 1 }}>
          {selectedMovie ? (
            <MovieDetail movie={selectedMovie} />
          ) : (
            <MovieList movies={movies} onMoviePress={fetchMovieDetails} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
