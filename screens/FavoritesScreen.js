import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import ItineraryCard from '../components/ItineraryCard';

export default function FavoritesScreen() {
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>❤️ Your Favorites</Text>
      {favorites.length === 0 ? (
        <Text style={styles.empty}>You haven't saved any itineraries yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => <ItineraryCard flight={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  empty: { marginTop: 20, fontSize: 16, color: '#555' },
});
