import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const activitiesList = ['Beaches', 'Hiking', 'Museums', 'Nightlife', 'Food', 'Shopping'];

export default function OnboardingScreen({ navigation }) {
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState([]);

  const toggleActivity = (activity) => {
    setSelectedActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleContinue = () => {
    navigation.navigate('Feed', {
      destination,
      departureDate: departureDate.toISOString().split('T')[0],
      activities: selectedActivities,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Where do you want to travel?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a destination"
        value={destination}
        onChangeText={setDestination}
      />

      <Text style={styles.label}>When do you want to go?</Text>
      <Pressable onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
        <Text>{departureDate.toDateString()}</Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={departureDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setDepartureDate(date);
          }}
        />
      )}

      <Text style={styles.label}>What activities do you enjoy?</Text>
      <View style={styles.checkboxContainer}>
        {activitiesList.map(activity => (
          <Pressable
            key={activity}
            onPress={() => toggleActivity(activity)}
            style={[
              styles.activityBox,
              selectedActivities.includes(activity) && styles.activityBoxSelected,
            ]}
          >
            <Text style={{ color: selectedActivities.includes(activity) ? 'white' : 'black' }}>
              {activity}
            </Text>
          </Pressable>
        ))}
      </View>

      <Button title="Continue" onPress={handleContinue} disabled={!destination} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    marginBottom: 10,
  },
  datePickerButton: {
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  activityBox: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 5,
  },
  activityBoxSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
});
