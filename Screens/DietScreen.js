import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { Camera } from "expo-camera";

export default function DietScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Você precisa permitir o acesso à câmera para escanear códigos.");
      }
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    Alert.alert("Código escaneado", `Código: ${data}`, [
      { text: "OK", onPress: () => setScanned(false) },
    ]);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão para acessar a câmera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFillObject}
        ref={(ref) => setCameraRef(ref)}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        flashMode={flashMode}
        type={cameraType}
      />
      {scanned && (
        <Button title="Escanear Novamente" onPress={() => setScanned(false)} />
      )}
      <Button
        title={flashMode === Camera.Constants.FlashMode.off ? "Ligar Flash" : "Desligar Flash"}
        onPress={() =>
          setFlashMode(
            flashMode === Camera.Constants.FlashMode.off
              ? Camera.Constants.FlashMode.torch
              : Camera.Constants.FlashMode.off
          )
        }
      />
      <Button
        title="Trocar Câmera"
        onPress={() =>
          setCameraType(
            cameraType === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});