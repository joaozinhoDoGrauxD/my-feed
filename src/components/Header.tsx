import { ReactNode } from "react";
import { Text, View, StyleSheet } from "react-native";

const Header = (): ReactNode => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>My Feed</Text>
      <Text style={styles.headerSub}>Agregador de RSS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#18181b",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fafafa",
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 14,
    color: "#a1a1aa",
    marginTop: 4,
    fontWeight: "500",
  },
});

export default Header;
