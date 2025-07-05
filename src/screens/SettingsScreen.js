import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SettingsScreen({ navigation }) {
  // For demo: use state; replace with DB logic later
  const [caregiver, setCaregiver] = useState('');

  const saveCaregiver = () => {
    if (!caregiver) {
      Alert.alert('Caregiver contact is required!');
      return;
    }
    Alert.alert('Caregiver contact saved!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.label}>Caregiver Contact (Required)</Text>
      <TextInput
        style={styles.input}
        placeholder="Caregiver Phone or Email"
        value={caregiver}
        onChangeText={setCaregiver}
      />
      <Button title="Save Caregiver" onPress={saveCaregiver} />
      <Button title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  label: { fontSize: 16, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 16 },
});