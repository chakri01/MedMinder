// Example: src/services/notifications.js
import * as Notifications from 'expo-notifications';

// Request permissions (call this on app start)
export async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

// Schedule a notification
export async function scheduleMedicationReminder(id, message, date) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Medication Reminder',
      body: message,
      data: { id },
    },
    trigger: date, // date: Date object or { seconds: ... }
  });
}