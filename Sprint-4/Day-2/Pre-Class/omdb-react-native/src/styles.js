import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Global styles
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light gray background
  },

  // SearchBar styles
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
  searchButton: {
    backgroundColor: '#333',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchButtonText: {
    color: 'white',
  },

  // MovieList styles
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

  // MovieDetail styles
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

  // Dark mode toggle styles
  darkModeToggle: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});

export default styles;
