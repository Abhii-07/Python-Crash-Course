import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Food Delivery App</Text>
      </View>

      {/* Image Carousel */}
      <ScrollView horizontal={true} style={styles.carousel}>
        <Image
          source={require('../assets/banner2.jpg')}
          style={styles.carouselImage}
        />
        <Image
          source={require('../assets/banner2.jpg')}
          style={styles.carouselImage}
        />
        <Image
          source={require('../assets/banner2.jpg')}
          style={styles.carouselImage}
        />
      </ScrollView>

      {/* Buttons for Navigation */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Menu')}
        >
          <Text style={styles.buttonText}>Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('OrderForm')}
        >
          <Text style={styles.buttonText}> Place Order</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ShowOrders')}
        >
          <Text style={styles.buttonText}>Review Orders</Text>
        </TouchableOpacity> */}
      </View>

      {/* Banners */}
      <View style={styles.bannerContainer}>
        <Image
          source={require('../assets/banner2.jpg')}
          style={styles.bannerImage}
        />
        <Image
          source={require('../assets/banner2.jpg')}
          style={styles.bannerImage}
        />
      </View>

      {/* Text and Offers */}
      <View style={styles.textContainer}>
        <Text style={styles.textHeading}>Special Offers</Text>
        <Text style={styles.offerText}>
          Get 20% off on your first order. Use code: FIRSTORDER20
        </Text>
        <Text style={styles.offerText}>
          Free delivery on orders above $30.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  carousel: {
    height: 200,
  },
  carouselImage: {
    width: 300,
    height: 200,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', 
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 5,
    width: '45%', 
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bannerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 20,
  },
  bannerImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    padding: 20,
    marginTop: 20,
    backgroundColor: '#f2f2f2',
  },
  textHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  offerText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default HomeScreen;
