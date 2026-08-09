import { ReactNode } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./RootLayout";
import { SessionProvider } from "@/services/auth/sessionProvider";
import Theme from "@/components/core/Theme";

export default function App(): ReactNode {
  return (
    <Theme>
      <NavigationContainer>
        <SessionProvider>
          <RootStack />
        </SessionProvider>
      </NavigationContainer>
    </Theme>
  );
}
