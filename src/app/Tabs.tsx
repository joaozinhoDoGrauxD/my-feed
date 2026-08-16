import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()
import { Center } from "@/components/ui/center";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/services/auth/session";
import AboutPage from "@/screens/AboutPage"
import IndexPage from "@/screens/IndexPage"
import LoginPage from "@/screens/LoginPage";
import RegisterPage from "@/screens/RegisterPage";
import { Home, Info } from "lucide-react-native";
import useTheme from "@/hooks/useTheme";

export default function Tabs() {
    const { session, isLoading } = useSession()
    const { isDark } = useTheme()

    if (isLoading) {
        return (
            <Center className="flex-1 bg-background">
                <Spinner size="large" />
            </Center>
        )
    }

    const activeColor = isDark ? "rgb(250, 250, 250)" : "rgb(10, 10, 10)"
    const inactiveColor = isDark ? "rgb(161, 161, 161)" : "rgb(115, 115, 115)"
    const backgroundColor = isDark ? "rgb(23, 23, 23)" : "rgb(255, 255, 255)"
    const borderColor = isDark ? "rgb(46, 46, 46)" : "rgb(229, 229, 229)"

    return (
    session ? (
        <Tab.Navigator screenOptions={({route}) => ({
            tabBarIcon: ({color, size}) => {
                if (route.name === 'Home'){
                    return <Home size={size} color={color} />
                } else if (route.name === 'About') {
                    return <Info size={size} color={color} />
                }
                return null
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
        })}>
            <Tab.Screen name="Home" component={IndexPage} options={{headerShown: false}} />
            <Tab.Screen name="About" component={AboutPage} options={{headerShown: false }}/>
        </Tab.Navigator>
    ) : (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginPage} />
            <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterPage} />
        </Stack.Navigator>
    )
    )

}