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
import { Home } from "lucide-react-native";
import { Icon } from "@/components/ui/icon";



export default function Tabs() {
    const { session, isLoading } = useSession()

    isLoading && (
        <Center className="flex-1 bg-background">
            <Spinner size="large" />
        </Center>
    )

    return (
    session ? (
        <Tab.Navigator >
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