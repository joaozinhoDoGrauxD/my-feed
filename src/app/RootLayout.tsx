import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AboutPage from "@/screens/AboutPage"
import IndexPage from "@/screens/IndexPage"
import LoginPage from "@/screens/LoginPage"
import RegisterPage from "@/screens/RegisterPage"
import { useSession } from "@/services/auth/session";
import { Center } from "@/gluestack/center";
import { Spinner } from "@/gluestack/spinner";

const Stack = createNativeStackNavigator()

export default function RootStack() {
    const { session, isLoading } = useSession()

    if (isLoading) {
        return (
            <Center className="flex-1 bg-background">
                <Spinner size="large" />
            </Center>
        )
    }

    return (
        <Stack.Navigator>
            {session ? (
                <>
                    <Stack.Screen options={{ headerShown: false }} name="Home" component={IndexPage} />
                    <Stack.Screen options={{ headerShown: false }} name="About" component={AboutPage} />
                </>
            ) : (
                <>
                    <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginPage} />
                    <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterPage} />
                </>
            )}
        </Stack.Navigator>
    )
}