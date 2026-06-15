import { ReactNode, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import Result from "@/components/Result";
import { Article } from "@/types/article.types";
import { api } from "@/services/api";
const Input = (): ReactNode => {
  const [url, setUrl] = useState("");
  const [items, setItems] = useState<Article[]>([]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Cole a URL do feed RSS..."
            placeholderTextColor="#71717a"
            onChangeText={setUrl}
            defaultValue={url}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={async () => {
              try {
                const response = await api.post<Article[]>("/api/rss/items", {
                  url,
                });
                setItems(response.data);
              } catch (error) {
                console.error("Erro ao buscar feed:", error);
              }
            }}
          >
            <Text style={styles.buttonText}>Buscar feed</Text>
          </TouchableOpacity>
        </View>
        <Result data={items} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: "#09090b",
  },
  inputContainer: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#18181b",
    color: "#fafafa",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#27272a",
  },
  button: {
    backgroundColor: "#6366f1",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 4px 8px rgba(99, 102, 241, 0.3)",
    elevation: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default Input;
