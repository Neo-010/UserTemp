import { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { questions } from './questions';

export default function QuizScreen() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const router = useRouter();

  const handleAnswer = (type: string | null) => {
    if (type) setAnswers([...answers, type]);

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      const result = answers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const finalTemperament = Object.keys(result).reduce((a, b) => (result[a] > result[b] ? a : b), "Невідомо");

      router.push(`/result?temperament=${finalTemperament}`);
    }
  };

  const askQuestion = () => {
    console.log("juyfuyfu");

    const answer = prompt(questions[index].question + " (Так/Ні)");

    if (answer && answer.toLowerCase() === "так") {
        handleAnswer(questions[index].temperament);
    } else {
        handleAnswer(null);
    }
};

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Натисни кнопку, щоб відповісти на запитання:</Text>
      <Button title="Відповісти" onPress={askQuestion} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});
