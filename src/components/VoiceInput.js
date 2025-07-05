import Voice from '@react-native-voice/voice';
import { useState } from 'react';
import { Button } from 'react-native';

export default function VoiceInput({ onResult }) {
  const [listening, setListening] = useState(false);

  const startListening = async () => {
    setListening(true);
    Voice.onSpeechResults = (e) => {
      setListening(false);
      onResult(e.value[0]);
    };
    await Voice.start('en-US');
  };

  return (
    <>
      <Button title={listening ? "Listening..." : "Speak"} onPress={startListening} />
    </>
  );
}