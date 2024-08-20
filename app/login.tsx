import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginPage() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (code === "OPP2024") {
      await AsyncStorage.setItem("sessionToken", code);
      await AsyncStorage.setItem("loginTime", Date.now().toString());
      router.replace("/member");
    } else {
      alert("Invalid code, please try again.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#202020] p-4">
      <Text className="text-white text-2xl mb-8">Login</Text>
      <TextInput
        placeholder="Enter your code"
        value={code}
        onChangeText={setCode}
        className="bg-[#434343] text-white p-4 rounded w-full"
      />
      <TouchableOpacity onPress={handleLogin} style={{ width: "100%" }}>
        <View className="bg-yellow-400 p-4 rounded-lg shadow-lg w-full mt-4">
          <Text className="text-black text-lg font-bold text-center">
            Log In
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
