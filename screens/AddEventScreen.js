import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export default function AddEventScreen() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [foto, setFoto] = useState(null);

  const seleccionarFoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) setFoto(result.assets[0].uri);
  };

  const guardarEvento = async () => {
    if (!titulo || !descripcion) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }
    const fileUri = FileSystem.documentDirectory + "eventos.json";
    let eventos = [];
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      const data = await FileSystem.readAsStringAsync(fileUri);
      eventos = JSON.parse(data);
    }
    const nuevoEvento = {
      titulo,
      descripcion,
      fecha: new Date().toLocaleDateString(),
      foto,
    };
    eventos.push(nuevoEvento);
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(eventos));
    Alert.alert("Éxito", "Evento guardado correctamente");
    setTitulo("");
    setDescripcion("");
    setFoto(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Registrar Evento</Text>
      <TextInput style={styles.input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
      <TextInput style={styles.textarea} placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} multiline />
      <Button title="Seleccionar Foto" onPress={seleccionarFoto} color="#e53935" />
      {foto && <Image source={{ uri: foto }} style={styles.image} />}
      <Button title="Guardar Evento" onPress={guardarEvento} color="#e53935" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", color: "#e53935", marginBottom: 15 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 10 },
  textarea: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, height: 100, textAlignVertical: "top", marginBottom: 10 },
  image: { width: "100%", height: 150, borderRadius: 10, marginVertical: 10 },
});
