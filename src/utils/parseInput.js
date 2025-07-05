import chrono from 'chrono-node';

export function parseMedicationInput(input) {
  // Example: "Take metformin 500mg after dinner"
  const time = chrono.parseDate(input);
  const doseMatch = input.match(/(\d+ ?mg|\d+ ?ml)/i);
  const nameMatch = input.match(/take ([a-zA-Z0-9 ]+)/i);

  return {
    name: nameMatch ? nameMatch[1].trim() : '',
    dose: doseMatch ? doseMatch[0] : '',
    time: time ? time.toISOString() : null,
  };
}