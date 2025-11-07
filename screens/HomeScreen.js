import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const noticias = [
  { id: "1", titulo: "Rescate exitoso en la autopista Duarte 🚑" },
  { id: "2", titulo: "Nuevo equipo de drones de emergencia listo para operar 🚁" },
  { id: "3", titulo: "Simulacro nacional de respuesta rápida completado 💪" },
];

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Imagen del encabezado */}
      <Image
        source={require("../assets/Emergencia.jpg")}
        style={styles.headerImage}
        resizeMode="contain"
      />

      {/* Información personal */}
      <Animated.View
        style={[styles.profileContainer, { transform: [{ translateY: slideAnim }] }]}
      >
        <Image
          source={require("../assets/scarlette.jpg")}
          style={styles.profilePhoto}
        />
        <View>
          <Text style={styles.name}>Scarlette Moya</Text>
          <Text style={styles.matricula}>Matrícula: 2023-0274</Text>
        </View>
      </Animated.View>

      {/* Título principal */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.title}>Equipo de Emergencias 911</Text>
        <Text style={styles.subtitle}>Atención, rapidez y compromiso</Text>
      </Animated.View>

      {/* Noticias */}
      <Text style={styles.sectionTitle}>📰 Noticias recientes</Text>
      <FlatList
        data={noticias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.newsCard}>
            <Text style={styles.newsText}>{item.titulo}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 60 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f4f6f8",
  },
  headerImage: {
    width: width * 0.9,
    height: 180,
    marginTop: 30,
    borderRadius: 10,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 10,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 10,
    width: width * 0.9,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  profilePhoto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#e53935",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  matricula: {
    fontSize: 14,
    color: "#555",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#e53935",
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  newsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    width: width * 0.9,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  newsText: {
    fontSize: 15,
    color: "#333",
  },
});

