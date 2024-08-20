import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function MemberPage() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const sessionToken = await AsyncStorage.getItem("sessionToken");
      const loginTime = await AsyncStorage.getItem("loginTime");

      if (sessionToken && loginTime) {
        const currentTime = Date.now();
        const loginTimestamp = parseInt(loginTime);

        if (currentTime - loginTimestamp >= 60 * 1000) {
          await AsyncStorage.removeItem("sessionToken");
          await AsyncStorage.removeItem("loginTime");
          router.replace("/login");
        }
      } else {
        router.replace("/login");
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("sessionToken");
    await AsyncStorage.removeItem("loginTime");
    router.replace("/login");
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#202020] p-4">
      <Text className="text-white text-2xl mb-8">
        Welcome to the Member Page
      </Text>

      <TouchableOpacity onPress={handleLogout} style={{ width: "100%" }}>
        <View className="bg-red-500 p-4 rounded-lg shadow-lg w-full mt-4">
          <Text className="text-white text-lg font-bold text-center">
            Log Out
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
