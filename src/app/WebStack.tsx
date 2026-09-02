import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexPage from "@/screens/IndexPage";
import ListsPage from "@/screens/ListsPage";
import ListContentPage from "@/screens/ListContentPage";
import AboutPage from "@/screens/AboutPage";
import LoginPage from "@/screens/LoginPage";
import RegisterPage from "@/screens/RegisterPage";
import { useSession } from "@/services/auth/session";

const Stack = createNativeStackNavigator();

export default function WebStack() {
  const { session } = useSession();

  return (
    <Stack.Navigator>
      {session ? (
        <>
          <Stack.Screen options={{ headerShown: false }} name="Home" component={IndexPage} />
          <Stack.Screen options={{ headerShown: false }} name="Lists" component={ListsPage} />
          <Stack.Screen options={{ headerShown: false }} name="ListContent" component={ListContentPage} />
          <Stack.Screen options={{ headerShown: false }} name="About" component={AboutPage} />
        </>
      ) : (
        <>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginPage} />
          <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterPage} />
        </>
      )}
    </Stack.Navigator>
  );
}