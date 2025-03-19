import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ResultScreen() {
  const params = useLocalSearchParams();
  const temperament = Array.isArray(params.temperament) 
    ? params.temperament[0] 
    : params.temperament || "Невідомо";

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Твій темперамент: {temperament.toUpperCase()}</Text>
      <Button title="Пройти знову" onPress={() => router.push('/')} />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
