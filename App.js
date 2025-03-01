import React from "react"; import 'react-native-url-polyfill/auto';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import DietScreen from "./Screens/DietScreen";
import WorkoutScreen from "./Screens/WorkoutScreen";
import DashboardScreen from "./Screens/DashboardScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Dieta"
          component={DietScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="fast-food" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Treino"
          component={WorkoutScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="barbell" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="stats-chart" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}