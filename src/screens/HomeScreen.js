import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MedMinder</Text>
      <Text style={styles.subtitle}>Your Medication Schedule</Text>

      {/* Placeholder for medication summary */}
      <View style={styles.summaryBox}>
        <Text>No medications scheduled yet.</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Add / View Schedule"
          onPress={() => navigation.navigate('Schedule')}
        />
        <Button
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 18, color: '#555', marginBottom: 24 },
  summaryBox: { padding: 16, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 32, width: '100%', alignItems: 'center' },
  buttonContainer: { width: '100%', gap: 16 },
});