import axios from "axios";
import * as rssParser from "react-native-rss-parser";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { Article } from "@/types/article.types";

const debuggerHost = Constants.expoConfig?.hostUri;
const localIp = debuggerHost?.split(":")[0];
const API_HOST =
  localIp || (Platform.OS === "android" ? "10.0.2.2" : "localhost");

const TUNNEL_HOST = process.env.EXPO_PUBLIC_TUNNEL;
const PRODUCTION_HOST = process.env.EXPO_PUBLIC_PRODUCTION;
const LOCAL_HOST: string | undefined = `http://${API_HOST}:3000`;

const myURL = () : string | undefined => {
  if(process.env.CODESPACES || process.env.EXPO_PUBLIC_BUN_ENV === 'testing'){
    return TUNNEL_HOST
  } else if (process.env.EXPO_PUBLIC_BUN_ENV === 'development') {
    return LOCAL_HOST 
  } else {
    return PRODUCTION_HOST
  }
}
const api =  axios.create({
  baseURL: myURL()
})

export const fetchItems = async (
  url: string,
  func: (items: Article[]) => void,
) => {
  try {
    const response: any = await api.post("/api/rss", { url })
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
        itunes
      }),
    );
    func(filteredItems);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
