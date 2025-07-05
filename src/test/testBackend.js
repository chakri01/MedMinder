import { speak } from '../components/TTS';
import { initDB } from '../services/db';
import { scheduleMedicationReminder } from '../services/notifications';
import { parseMedicationInput } from '../utils/parseInput';

// Run all backend tests
export async function runBackendTests() {
  // 1. Test DB initialization
  try {
    initDB();
    console.log('✅ Database initialized successfully.');
  } catch (e) {
    console.error('❌ Database initialization failed:', e);
  }

  // 2. Test NLP parsing
  const nlpTest = "Take metformin 500mg after dinner";
  const nlpResult = parseMedicationInput(nlpTest);
  console.log('NLP parse result:', nlpResult);

  // 3. Test notification (fires in 1 minute)
  const date = new Date(Date.now() + 60000);
  scheduleMedicationReminder(1, "Test reminder: Take your medicine", date);
  console.log('Scheduled a test notification for 1 minute from now.');

  // 4. Test TTS
  speak("This is a test of the text to speech system.");
  console.log('Spoke test message using TTS.');
}