import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

import React from "react";
import HomeScreen from "./screens/HomeScreen";
import DetailMovie from "./screens/DetailMovie";
import Person from "./screens/Person";
import SearchScreen from "./screens/SearchScreen";
import DetailTV from "./screens/DetailTV";


export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Movie" component={DetailMovie} />
        <Stack.Screen name="Person" component={Person} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="TV" component={DetailTV} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};