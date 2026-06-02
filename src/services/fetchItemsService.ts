import axios from "axios";
import * as rssParser from "react-native-rss-parser";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { Article } from "@/types/article.types";

const debuggerHost = Constants.expoConfig?.hostUri;
const localIp = debuggerHost?.split(":")[0];
const API_HOST =
  localIp || (Platform.OS === "android" ? "10.0.2.2" : "localhost");

export const fetchItems = async (
  myurl: string,
  func: (items: Article[]) => void,
) => {
  try {
    const response: any = await axios.post(`http://${API_HOST}:3000/api/rss`, {
      url: myurl,
    });
    const rss = await rssParser.parse(response.data);
    let items = rss.items;
    const filteredItems = items.map(
      ({
        title,
        description,
        content,
        authors,
        published,
        enclosures,
        itunes,
      }) => ({
        title,
        description,
        content,
        authors: authors?.filter((a): a is { name: string } => !!a),
        published,
        enclosures,
        itunes,
        feed: rss.title,
      }),
    );
    func(filteredItems);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
