import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FeedScreen({ route }) {
  const { destination, departureDate, activities } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results for {destination}</Text>
      <Text>Departure: {departureDate}</Text>
      <Text>Activities: {activities.join(', ')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});
