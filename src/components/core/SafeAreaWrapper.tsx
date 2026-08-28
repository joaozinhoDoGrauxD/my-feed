import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from "../ui/box";

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function SafeAreaWrapper({ children, className = "flex-1 bg-background" }: SafeAreaWrapperProps) {
  if (Platform.OS === 'web') {
    return (
      <Box className={className}>
        {children}
      </Box>
    );
  }

  return (
    <SafeAreaView className={className} style={{ flex: 1 }}>
      <Box className="flex-1 bg-background">
        {children}
      </Box>
    </SafeAreaView>
  );
}
