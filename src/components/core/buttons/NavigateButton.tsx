import { useNavigation } from "@react-navigation/native";
import { Button, ButtonText } from "@/gluestack/button";
export default function NavigateButton({route, title} : {route: any, title: string}) {
    const navigation = useNavigation()
    return (
        <Button onPress={() => navigation.navigate(route)}>
            <ButtonText>{title}</ButtonText>
        </Button>
    )
}