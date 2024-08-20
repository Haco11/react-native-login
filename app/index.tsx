import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const sessionToken = await AsyncStorage.getItem("sessionToken");
      const loginTime = await AsyncStorage.getItem("loginTime");

      if (sessionToken && loginTime) {
        const currentTime = Date.now();
        const loginTimestamp = parseInt(loginTime);

        if (currentTime - loginTimestamp < 60 * 1000) {
          router.replace("/member");
        } else {
          // Session expired, clear storage and redirect to login
          await AsyncStorage.removeItem("sessionToken");
          await AsyncStorage.removeItem("loginTime");
          router.replace("/login");
        }
      } else {
        router.replace("/login");
      }
    };

    checkAuth();
  }, []);

  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
