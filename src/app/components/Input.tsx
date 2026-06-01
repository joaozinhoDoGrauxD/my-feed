import axios from "axios";
import { ReactNode, useState } from "react";
import { Button, Platform, StyleSheet, TextInput, View } from "react-native";
import * as rssParser from "react-native-rss-parser";
import Constants from "expo-constants";
import Result from "./Result";

const debuggerHost = Constants.expoConfig?.hostUri;
const localIp = debuggerHost?.split(':')[0];
const API_HOST = localIp || (Platform.OS === "android" ? "10.0.2.2" : "localhost");

const Input = (): ReactNode => {
  const [url, setUrl] = useState("");
  const [items, setItems] = useState<any[]>([]);

  const fetchItems = async () => {
    try {
      const response : any = await axios.post(
        `http://${API_HOST}:3000/api/rss`,
        { url }
      );
      const rss = await rssParser.parse(response.data);
      const items = rss.items;
      const filteredItems = items.map(
        ({ title, description, content, authors, published }) => ({
          title,
          description,
          content,
          authors,
          published,
        }),
      );
      setItems(filteredItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Cole a URL do feed RSS..."
          placeholderTextColor="#555"
          onChangeText={setUrl}
          defaultValue={url}
        />
        <Button onPress={fetchItems} title="Buscar feed" color="#6c63ff" />
        <Result data={items} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#0f0f0f",
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  button: {
    marginTop: 4,
  },
});

export default Input;
