import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function ItineraryCard({ flight, onNext }) {
  const [liked, setLiked] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const { addToFavorites } = useFavorites();

  const itinerary = flight.itineraries?.[0];
  const segments = itinerary?.segments || [];
  const departure = segments[0]?.departure;
  const arrival = segments[segments.length - 1]?.arrival;
  const price = flight.price?.total;
  const duration = itinerary?.duration?.replace('PT', '').toLowerCase();

  const destinationCode = arrival?.iataCode;

  useEffect(() => {
  const iataToCity = {
    JFK: 'New York',
    LAX: 'Los Angeles',
    CDG: 'Paris',
    SFO: 'San Francisco',
    DXB: 'Dubai',
    ORD: 'Chicago',
    ATL: 'Atlanta',
    HND: 'Tokyo',
    SYD: 'Sydney',
    // Add more as needed
  };

  const fetchImage = async () => {
    try {
      const cityName = iataToCity[destinationCode] || 'travel';
      const unsplashUrl = `https://source.unsplash.com/featured/?${cityName},city`;
      setImageUrl(unsplashUrl);
      console.log('Using image URL:', unsplashUrl);
    } catch (e) {
      console.error('Image fetch failed', e);
      setImageUrl(null);
    }
  };

  fetchImage();
}, [destinationCode]);


  const handleLike = () => {
    setLiked(true);
    addToFavorites(flight);
    setTimeout(() => {
      setLiked(false);
      onNext();
    }, 300);
  };

  return (
    <View style={styles.card}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      ) : (
        <ActivityIndicator style={styles.image} size="large" />
      )}

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.route}>
          {departure?.iataCode} → {arrival?.iataCode}
        </Text>
        <Text style={styles.time}>
          {departure?.at?.substring(0, 16)} → {arrival?.at?.substring(0, 16)}
        </Text>
        <Text style={styles.price}>💵 ${price}</Text>
        <Text style={styles.duration}>⏱ Duration: {duration}</Text>
        <Text style={styles.details}>Number of Stops: {segments.length - 1}</Text>
        <Text style={styles.details}>
          Airline: {segments[0]?.carrierCode || 'Unknown'}
        </Text>
      </ScrollView>

      <Pressable onPress={handleLike} style={styles.heart}>
        <Ionicons name={liked ? 'heart' : 'heart-outline'} size={36} color={liked ? 'red' : 'white'} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: screenHeight,
    width: screenWidth,
    backgroundColor: '#fff',
    position: 'relative',
  },
  image: {
    width: screenWidth,
    height: screenHeight * 0.4,
    backgroundColor: '#ccc',
  },
  content: {
    padding: 20,
    height: screenHeight * 0.6,
  },
  route: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  time: { marginTop: 8, color: '#444' },
  price: { marginTop: 10, fontSize: 20 },
  duration: { marginTop: 6 },
  details: { marginTop: 4 },
  heart: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#00000090',
    padding: 12,
    borderRadius: 100,
  },
});
