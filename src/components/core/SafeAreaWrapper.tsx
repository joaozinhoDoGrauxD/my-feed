import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from "../ui/box";
import useTheme from "@/hooks/useTheme";

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function SafeAreaWrapper({ children, className = "flex-1 bg-background" }: SafeAreaWrapperProps) {
  const { isDark } = useTheme();

  const content = (
    <Box className="flex-1 bg-background relative overflow-hidden">
      {/* Luzes de fundo para ativar o efeito Liquid Glass no Dark Mode */}
      {isDark && (
        <>
          <Box 
            className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-indigo-600/25 blur-3xl" 
            style={{ pointerEvents: 'none' }}
          />
          <Box 
            className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl" 
            style={{ pointerEvents: 'none' }}
          />
          <Box 
            className="absolute -bottom-20 left-10 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" 
            style={{ pointerEvents: 'none' }}
          />
        </>
      )}

      {children}
    </Box>
  );

  if (Platform.OS === 'web') {
    return (
      <Box className={className}>
        {content}
      </Box>
    );
  }

  return (
    <SafeAreaView className={className} style={{ flex: 1 }}>
      {content}
    </SafeAreaView>
  );
}