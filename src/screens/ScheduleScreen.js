import { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function ScheduleScreen({ navigation }) {
  // For demo: use state; replace with DB logic later
  const [caregiver, setCaregiver] = useState('');
  const [medications, setMedications] = useState([]);
  const [medName, setMedName] = useState('');
  const [dose, setDose] = useState('');
  const [time, setTime] = useState('');

  // Prompt for caregiver if not set
  if (!caregiver) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Enter Caregiver Contact (Required)</Text>
        <TextInput
          style={styles.input}
          placeholder="Caregiver Phone or Email"
          value={caregiver}
          onChangeText={setCaregiver}
        />
        <Button title="Save" onPress={() => {
          if (!caregiver) Alert.alert('Caregiver contact is required!');
        }} />
      </View>
    );
  }

  // Add medication handler
  const addMedication = () => {
    if (!medName || !dose || !time) {
      Alert.alert('Please fill all fields');
      return;
    }
    setMedications([...medications, { id: Date.now().toString(), medName, dose, time }]);
    setMedName('');
    setDose('');
    setTime('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medication Schedule</Text>
      <Text style={styles.label}>Caregiver: {caregiver}</Text>

      {/* Medication Add Form */}
      <TextInput
        style={styles.input}
        placeholder="Medication Name"
        value={medName}
        onChangeText={setMedName}
      />
      <TextInput
        style={styles.input}
        placeholder="Dose (e.g., 500mg)"
        value={dose}
        onChangeText={setDose}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (e.g., 8:00 AM)"
        value={time}
        onChangeText={setTime}
      />
      <Button title="Add Medication" onPress={addMedication} />

      {/* Medication List */}
      <FlatList
        data={medications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.medItem}>
            <Text>{item.medName} - {item.dose} at {item.time}</Text>
            {/* Add edit/delete buttons here if needed */}
          </View>
        )}
        ListEmptyComponent={<Text style={{ marginTop: 16 }}>No medications added yet.</Text>}
      />

      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  label: { fontSize: 16, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 12 },
  medItem: { padding: 8, borderBottomWidth: 1, borderColor: '#eee' },
});