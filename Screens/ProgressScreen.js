import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import firestore from "@react-native-firebase/firestore";

export default function ProgressScreen() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("workoutLogs")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setLogs(data);
      });

    return () => unsubscribe();
  }, []);

  const labels = logs.map((log) => log.exerciseName);
  const data = logs.map((log) => parseFloat(log.gastoCalorico));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progresso</Text>
      <LineChart
        data={{
          labels,
          datasets: [{ data }],
        }}
        width={300}
        height={200}
        yAxisSuffix=" kcal"
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        bezier
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
});