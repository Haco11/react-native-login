import React from "react";
import { Text } from "react-native";
import { Stack } from "expo-router";
import "../global.css";
const CustomHeaderTitle = ({ title }: { title: string }) => {
  return (
    <Text
      style={{
        fontSize: 20,
        color: "#FFF",
        fontWeight: "bold",
        textTransform: "uppercase",
      }}>
      {title}
    </Text>
  );
};

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: (props) => <CustomHeaderTitle title={props.children} />,
        headerStyle: {
          backgroundColor: "#202020",
        },
      }}
    />
  );
}
