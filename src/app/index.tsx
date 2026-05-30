import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Input from "@/app/components/Input";
import Header from "@/app/components/Header";

export default function Index(): ReactNode {
  return (
    <SafeAreaProvider style={styles.safe}>
      <Header/>
      <Input />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  }
});
