import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";

const handleLogExercise = async (workoutId, exerciseId, exerciseName, sets, reps, weight) => {
    const gastoCalorico = calcularGastoCalorico(exerciseName, reps, weight);
    const newLog = { workoutId, exerciseId, exerciseName, sets, reps, weight, gastoCalorico };

    // Salvar no Firestore
    await firestore().collection("workoutLogs").add(newLog);

    // Atualizar o estado local
    setLogs([...logs, newLog]);
};
const calcularGastoCalorico = (exercise, reps, weight) => {
    const METs = {
        Supino: 3.5,
        Agachamento: 5.0,
        "Levantamento Terra": 6.0,
        "Rosca Direta": 2.5,
    };

    const met = METs[exercise] || 3.0; // MET padrão para exercícios não listados
    const tempo = reps * 0.1; // Estimativa de tempo por repetição (em minutos)
    const gastoCalorico = met * weight * tempo;

    return gastoCalorico.toFixed(2); // Retorna o valor com 2 casas decimais
};

export default function WorkoutLogScreen({ route }) {
    const { workouts } = route.params;
    const [logs, setLogs] = useState([]);

    const handleLogExercise = (workoutId, exerciseId, exerciseName, sets, reps, weight) => {
        const gastoCalorico = calcularGastoCalorico(exerciseName, reps, weight);
        const newLog = { workoutId, exerciseId, exerciseName, sets, reps, weight, gastoCalorico };
        setLogs([...logs, newLog]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registre seu treino:</Text>
            <FlatList
                data={workouts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item: workout }) => (
                    <View style={styles.workoutContainer}>
                        <Text style={styles.workoutTitle}>{workout.name}</Text>
                        <FlatList
                            data={workout.exercises}
                            keyExtractor={(exercise) => exercise.id}
                            renderItem={({ item: exercise }) => (
                                <View style={styles.exerciseContainer}>
                                    <Text>{exercise.name}</Text>
                                    <TextInput
                                        placeholder="Séries"
                                        keyboardType="numeric"
                                        onChangeText={(text) => handleLogExercise(workout.id, exercise.id, exercise.name, text)}
                                    />
                                    <TextInput
                                        placeholder="Repetições"
                                        keyboardType="numeric"
                                        onChangeText={(text) => handleLogExercise(workout.id, exercise.id, exercise.name, null, text)}
                                    />
                                    <TextInput
                                        placeholder="Peso (kg)"
                                        keyboardType="numeric"
                                        onChangeText={(text) => handleLogExercise(workout.id, exercise.id, exercise.name, null, null, text)}
                                    />
                                    {logs
                                        .filter((log) => log.exerciseId === exercise.id)
                                        .map((log, index) => (
                                            <Text key={index}>
                                                Gasto calórico: {log.gastoCalorico} kcal
                                            </Text>
                                        ))}
                                </View>
                            )}
                        />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
    workoutContainer: { marginBottom: 16 },
    workoutTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
    exerciseContainer: { marginBottom: 8 },
});