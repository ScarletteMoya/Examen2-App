// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import EventsListScreen from "./screens/EventsListScreen";
import AddEventScreen from "./screens/AddEventScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Inicio") iconName = "home";
            else if (route.name === "Eventos") iconName = "list";
            else if (route.name === "Registrar") iconName = "add-circle";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#e53935",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="Eventos" component={EventsListScreen} />
        <Tab.Screen name="Registrar" component={AddEventScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

