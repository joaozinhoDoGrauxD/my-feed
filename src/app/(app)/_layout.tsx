import React from "react";
import { Tabs, Stack } from "expo-router";
import { Platform, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Rss, PlaySquare, Settings, Layers } from "lucide-react-native";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";
import useTheme from "@/hooks/useTheme";

// Configuração da mola elástica estilo Apple
const SPRING_CONFIG = {
  damping: 15,
  stiffness: 180,
  mass: 0.6,
};

// Componente do Botão com Animação Fluida e Haptics
function TabButton(props: any) {
  const { children, onPress, accessibilityState, isDark } = props;
  const focused = accessibilityState?.selected;
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(scale.value, SPRING_CONFIG) }],
      backgroundColor: withTiming(
        focused
          ? isDark
            ? "rgba(255, 255, 255, 0.12)"
            : "rgba(99, 102, 241, 0.12)"
          : "transparent",
        { duration: 250 }
      ),
    };
  });

  const handlePressIn = () => {
    scale.value = 0.88; // Leve encolhida ao tocar
  };

  const handlePressOut = () => {
    scale.value = 1;
  };

  const handlePress = (e: any) => {
    // Feedback tátil sutil estilo iOS
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.(e);
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ flex: 1, alignItems: "center", justifyContent: "center", height: "100%" }}
    >
      <Animated.View
        style={[
          {
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 4,
            borderRadius: 9999,
            width: "88%",
            height: 48, // Altura fixa para centralizar perfeitamente no container
          },
          animatedStyle,
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}

export default function AppLayout() {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();

  if (Platform.OS === "web") {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="about" />
        <Stack.Screen name="(web)/bookmarks" />
        <Stack.Screen name="(web)/folder" />
        <Stack.Screen name="(web)/lists" />
      </Stack>
    );
  }

  const bottomMargin = insets.bottom + 12;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6366f1",
        tabBarInactiveTintColor: isDark ? "#94a3b8" : "#64748b",
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: "600",
          marginTop: 1,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarButton: (props) => <TabButton {...props} isDark={isDark} />,
        tabBarStyle: {
          position: "absolute",
          bottom: bottomMargin,
          left: 28,
          right: 28,
          height: 60,
          borderRadius: 9999,
          backgroundColor: isDark ? "rgba(15, 23, 42, 0.65)" : "rgba(255, 255, 255, 0.75)",
          borderWidth: 1,
          borderColor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.6)",
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.22,
          shadowRadius: 16,
          paddingHorizontal: 4,
          paddingBottom: 0, // Zera o padding do iOS/Android que empurrava tudo pra cima
          paddingTop: 0,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        },
        tabBarBackground: () => (
          <BlurView
            tint={isDark ? "dark" : "light"}
            intensity={85}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="(mobile)/contents"
        options={{
          title: "Conteúdos",
          tabBarIcon: ({ color }) => <Layers size={18} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(mobile)/player"
        options={{
          title: "Player",
          tabBarIcon: ({ color }) => <PlaySquare size={18} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(mobile)/rss"
        options={{
          title: "RSS",
          tabBarIcon: ({ color }) => <Rss size={18} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(mobile)/settings"
        options={{
          title: "Ajustes",
          tabBarIcon: ({ color }) => <Settings size={18} color={color} />,
        }}
      />

      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="about" options={{ href: null }} />
      <Tabs.Screen name="(web)/bookmarks" options={{ href: null }} />
      <Tabs.Screen name="(web)/folder" options={{ href: null }} />
      <Tabs.Screen name="(web)/lists" options={{ href: null }} />
    </Tabs>
  );
}