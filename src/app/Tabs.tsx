import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Center } from "@/components/ui/center";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/services/auth/session";
import AboutPage from "@/screens/AboutPage";
import IndexPage from "@/screens/IndexPage";
import SettingsPage from "@/screens/SettingsPage";
import LoginPage from "@/screens/LoginPage";
import PlayerPage from "@/screens/PlayerPage";
import RssPage from "@/screens/RssPage";
import RegisterPage from "@/screens/RegisterPage";
import ListsPage from "@/screens/ListsPage";
import { Home, Info, Rss, PlayCircle, Settings } from "lucide-react-native";
import useTheme from "@/hooks/useTheme";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Index" component={IndexPage} options={{ headerShown: false }} />
      <Stack.Screen name="Lists" component={ListsPage} options={{ headerShown: false }} />
      <Stack.Screen name="About" component={AboutPage} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function Tabs() {
  const { session, isLoading } = useSession();
  const { isDark } = useTheme();

  if (isLoading) {
    return (
      <Center className="flex-1 bg-background">
        <Spinner size="large" />
      </Center>
    );
  }

  const activeColor = isDark ? "rgb(250, 250, 250)" : "rgb(10, 10, 10)";
  const inactiveColor = isDark ? "rgb(161, 161, 161)" : "rgb(115, 115, 115)";
  const backgroundColor = isDark ? "rgb(23, 23, 23)" : "rgb(255, 255, 255)";
  const borderColor = isDark ? "rgb(46, 46, 46)" : "rgb(229, 229, 229)";

  return session ? (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home") return <Home size={size} color={color} />;
          if (route.name === "About") return <Info size={size} color={color} />;
          if (route.name === "Rss") return <Rss size={size} color={color} />;
          if (route.name === "Player") return <PlayCircle size={size} color={color} />;
          if (route.name === "Settings") return <Settings size={size} color={color} />;
          return null;
        },
        tabBarStyle: {
          backgroundColor,
          borderTopColor: borderColor,
          borderTopWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Rss" component={RssPage} options={{ headerShown: false }} />
      <Tab.Screen name="Player" component={PlayerPage} options={{ headerShown: false }} />
      <Tab.Screen name="About" component={AboutPage} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={SettingsPage} options={{ headerShown: false }} />
    </Tab.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginPage} />
      <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterPage} />
    </Stack.Navigator>
  );
}