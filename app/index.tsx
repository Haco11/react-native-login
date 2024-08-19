import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        setIsAuthenticated(true);
        router.replace("/member");
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg">Login Page</Text>
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.setItem("authToken", "OPP2024");
          setIsAuthenticated(true);
          router.replace("/member");
        }}
        className="bg-yellow-400 w-full p-4 rounded-lg shadow-lg">
        <Text className="text-black text-lg font-bold text-center">Log In</Text>
      </TouchableOpacity>
    </View>
  );
}
