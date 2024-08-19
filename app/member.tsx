import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MemberPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("sessionToken");
    router.replace("./login");
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#202020] p-4">
      <Text className="text-white text-2xl mb-8">Welcome, Member!</Text>
      <TouchableOpacity onPress={handleLogout} style={{ width: "100%" }}>
        <View className="bg-red-500 p-4 rounded-lg shadow-lg w-full">
          <Text className="text-white text-lg text-center">Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
