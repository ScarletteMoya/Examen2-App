import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";

export default function EventsListScreen() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    cargarEventos();
  }, []);

  const cargarEventos = async () => {
    const fileUri = FileSystem.documentDirectory + "eventos.json";
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      const data = await FileSystem.readAsStringAsync(fileUri);
      setEventos(JSON.parse(data));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Eventos registrados</Text>
      <FlatList
        data={eventos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            {item.foto ? <Image source={{ uri: item.foto }} style={styles.image} /> : null}
            <Text style={styles.eventTitle}>{item.titulo}</Text>
            <Text style={styles.eventDate}>📅 {item.fecha}</Text>
            <Text style={styles.eventDesc}>{item.descripcion}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", color: "#e53935", marginBottom: 10 },
  eventCard: { marginBottom: 15, borderRadius: 10, padding: 10, backgroundColor: "#f9f9f9", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  eventTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  eventDate: { fontSize: 14, color: "#666" },
  eventDesc: { fontSize: 14, marginTop: 5 },
  image: { width: "100%", height: 150, borderRadius: 10, marginTop: 5 },
});
