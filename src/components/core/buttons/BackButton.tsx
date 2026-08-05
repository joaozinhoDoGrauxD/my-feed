import { useNavigation } from "@react-navigation/native";
import { Button, ButtonText } from "@/gluestack/button";
export default function BackButton({title} : {title: string}) {
    const navigation = useNavigation()
    return (
        <Button onPress={navigation.goBack}>
            <ButtonText>{title}</ButtonText>
        </Button>
    )
}
