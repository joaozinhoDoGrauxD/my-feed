import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Input from "@/components/Input";
import Header from "@/components/Header";

export default function Index(): ReactNode {
  return (
    <SafeAreaProvider style={styles.safe}>
      <Header />
      <Input />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#09090b",
  },
});
