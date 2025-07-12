import { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';

export default function App() {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [itineraries, setItineraries] = useState([]);

  const fetchItineraries = async () => {
  setLoading(true);

  // Simulate network delay
  setTimeout(() => {
    setItineraries([
      {
        destination: 'Tokyo, Japan',
        description: 'Explore temples, sushi, and cherry blossoms.',
        flight: '$780 from SFO',
        hotel: 'Shinjuku Granbell Hotel - $110/night',
      },
      {
        destination: 'Santorini, Greece',
        description: 'White cliffs, blue domes, sunsets by the sea.',
        flight: '$620 from JFK',
        hotel: 'Canaves Oia - $200/night',
      },
    ]);
    setLoading(false);
  }, 1000);
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dream Trip Matcher 🌍</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your travel idea..."
        value={idea}
        onChangeText={setIdea}
      />

      <Button title="Find Matches" onPress={fetchItineraries} disabled={loading} />

      {loading && <ActivityIndicator style={{ marginTop: 20 }} size="large" />}

      {!loading && itineraries.length > 0 && (
        <Swiper
          cards={itineraries}
          renderCard={(card) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{card.destination}</Text>
              <Text>{card.description}</Text>
              <Text style={styles.cardDetail}>✈️ Flight: {card.flight}</Text>
              <Text style={styles.cardDetail}>🏨 Hotel: {card.hotel}</Text>
            </View>
          )}
          backgroundColor="transparent"
          stackSize={3}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
    height: 400,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardDetail: {
    marginTop: 10,
  },
});
