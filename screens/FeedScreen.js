import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { searchFlights } from '../api/amadeus';
import ItineraryCard from '../components/ItineraryCard';

export default function FeedScreen({ route }) {
  const { destination, departureDate } = route.params;
  const [flights, setFlights] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const results = await searchFlights({
        origin: 'JFK',
        destination: destination.toUpperCase().slice(0, 3),
        date: departureDate,
      });
      setFlights(results);
      setLoading(false);
    };

    fetch();
  }, []);

  const nextFlight = () => {
    setIndex((prev) => Math.min(prev + 1, flights.length - 1));
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} size="large" />;

  return (
    <View style={styles.container}>
      {flights.length > 0 ? (
        <ItineraryCard flight={flights[index]} onNext={nextFlight} />
      ) : (
        <Text>No flights found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
});
