import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../context/FavoritesContext';

export default function ItineraryCard({ flight, onNext }) {
  const [liked, setLiked] = useState(false);
  const { addToFavorites } = useFavorites();

  const itinerary = flight.itineraries?.[0];
  const segments = itinerary?.segments || [];
  const departure = segments[0]?.departure;
  const arrival = segments[segments.length - 1]?.arrival;

  const price = flight.price?.total;
  const duration = itinerary?.duration?.replace('PT', '').toLowerCase();

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
      <Text style={styles.route}>
        {departure?.iataCode} → {arrival?.iataCode}
      </Text>
      <Text style={styles.time}>
        {departure?.at?.substring(0, 16)} → {arrival?.at?.substring(0, 16)}
      </Text>
      <Text style={styles.price}>💵 ${price}</Text>
      <Text style={styles.duration}>⏱ Duration: {duration}</Text>

      <Pressable onPress={handleLike} style={styles.heart}>
        <Ionicons name={liked ? 'heart' : 'heart-outline'} size={32} color={liked ? 'red' : 'gray'} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    position: 'relative',
  },
  route: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  time: { color: '#555', marginBottom: 6 },
  price: { fontSize: 18, marginTop: 10 },
  duration: { fontStyle: 'italic', color: '#444' },
  heart: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
});
