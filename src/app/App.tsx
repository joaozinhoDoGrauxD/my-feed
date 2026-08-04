import { ReactNode } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./RootLayout";

export default function App(): ReactNode {
  return (
    <NavigationContainer>
      <RootStack/>
    </NavigationContainer>
)
}
