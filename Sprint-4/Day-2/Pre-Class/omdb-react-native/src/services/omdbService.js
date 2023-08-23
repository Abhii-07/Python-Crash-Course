// OMDB API base URL
const OMDB_API_BASE_URL = 'https://www.omdbapi.com/';

// Your OMDB API Key (replace with your actual API key)
const API_KEY = '86c0187';

// Function to search for movies by title
export const searchMovies = async (searchText) => {
  try {
    const response = await fetch(`${OMDB_API_BASE_URL}?apikey=${API_KEY}&s=${searchText}`);
    const data = await response.json();

    if (data.Search) {
      return data.Search;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error searching for movies:', error);
    throw error;
  }
};

// Function to get movie details by IMDb ID
export const getMovieDetails = async (imdbID) => {
  try {
    const response = await fetch(`${OMDB_API_BASE_URL}?apikey=${API_KEY}&i=${imdbID}`);
    const movie = await response.json();
    
    return movie;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
