import {createNativeStackNavigator} from "@react-navigation/native-stack"
import AboutPage from "@/screens/AboutPage"
import IndexPage from "@/screens/IndexPage"
const Stack = createNativeStackNavigator()

export default function RootStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen options={{headerShown: false}} name="Home" component={IndexPage}/>
            <Stack.Screen options={{ headerShown: false}} name="About" component={AboutPage}/>
        </Stack.Navigator>
    )
}