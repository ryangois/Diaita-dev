import React, { useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
// import Exercise3D from "../Components/Exercise3D";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Função para salvar os exercícios
const saveExercises = async (exercises) => {
  try {
    await AsyncStorage.setItem("selectedExercises", JSON.stringify(exercises));
  } catch (error) {
    console.error("Erro ao salvar exercícios:", error);
  }
};

// Função para carregar os exercícios
const loadExercises = async () => {
  try {
    const savedExercises = await AsyncStorage.getItem("selectedExercises");
    return savedExercises ? JSON.parse(savedExercises) : [];
  } catch (error) {
    console.error("Erro ao carregar exercícios:", error);
    return [];
  }
};

// Atualize o componente WorkoutScreen
export default function WorkoutScreen() {
  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {
    // Carregar exercícios ao iniciar a tela
    loadExercises().then((exercises) => setSelectedExercises(exercises));
  }, []);

  const handleSelectExercise = (exercise) => {
    const newExercises = [...selectedExercises, exercise];
    setSelectedExercises(newExercises);
    saveExercises(newExercises); // Salvar no AsyncStorage
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Treino</Text>
      <View style={styles.canvasContainer}>
        <Exercise3D />
      </View>
      <Text style={styles.subtitle}>Escolha seus exercícios:</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() => handleSelectExercise(item)}
          />
        )}
      />
      <Text style={styles.subtitle}>Exercícios Selecionados:</Text>
      <FlatList
        data={selectedExercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.selectedExercise}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  subtitle: { fontSize: 18, fontWeight: "bold", marginTop: 16 },
  canvasContainer: { height: 200, marginBottom: 16 },
  selectedExercise: {
    padding: 8,
    backgroundColor: "#f0f0f0",
    marginBottom: 8,
    borderRadius: 4,
  },
});