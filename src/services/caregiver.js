import { Linking } from 'react-native';

export function alertCaregiver(contact, message) {
  // For SMS (Android)
  Linking.openURL(`sms:${contact}?body=${encodeURIComponent(message)}`);
  // For WhatsApp/email, use appropriate Linking URLs or integrate Twilio API for production
}