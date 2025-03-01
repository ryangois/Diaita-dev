import React, { useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";

const exercises = [
  { id: "1", name: "Supino" },
  { id: "2", name: "Agachamento" },
  { id: "3", name: "Levantamento Terra" },
  { id: "4", name: "Rosca Direta" },
];

export default function WorkoutPlanScreen({ route, navigation }) {
  const { frequency } = route.params;
  const [workouts, setWorkouts] = useState([]);

  const handleAddWorkout = () => {
    const newWorkout = { id: workouts.length + 1, name: `Treino ${String.fromCharCode(65 + workouts.length)}`, exercises: [] };
    setWorkouts([...workouts, newWorkout]);
  };

  const handleSelectExercise = (workoutId, exercise) => {
    const updatedWorkouts = workouts.map((workout) =>
      workout.id === workoutId
        ? { ...workout, exercises: [...workout.exercises, exercise] }
        : workout
    );
    setWorkouts(updatedWorkouts);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Defina seus treinos:</Text>
      <Button title="Adicionar Treino" onPress={handleAddWorkout} />
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.workoutContainer}>
            <Text style={styles.workoutTitle}>{item.name}</Text>
            <FlatList
              data={exercises}
              keyExtractor={(exercise) => exercise.id}
              renderItem={({ item: exercise }) => (
                <Button
                  title={exercise.name}
                  onPress={() => handleSelectExercise(item.id, exercise)}
                />
              )}
            />
          </View>
        )}
      />
      <Button
        title="Iniciar Treinos"
        onPress={() => navigation.navigate("WorkoutLog", { workouts })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  workoutContainer: { marginBottom: 16 },
  workoutTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
});