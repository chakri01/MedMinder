import PushNotification from 'react-native-push-notification';

export function scheduleMedicationReminder(id, message, date) {
  PushNotification.localNotificationSchedule({
    id: String(id),
    message,
    date,
    allowWhileIdle: true,
  });
}