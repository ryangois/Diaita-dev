import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const frequencies = [3, 4, 5, 6, 7];

export default function HomeScreen({ navigation }) {
  const [selectedFrequency, setSelectedFrequency] = useState(null);

  const handleSelectFrequency = (frequency) => {
    setSelectedFrequency(frequency);
    navigation.navigate("WorkoutPlan", { frequency });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quantas vezes por semana você quer treinar?</Text>
      {frequencies.map((freq) => (
        <Button
          key={freq}
          title={`${freq}x por semana`}
          onPress={() => handleSelectFrequency(freq)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
});