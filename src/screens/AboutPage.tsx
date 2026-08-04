import BackButton from "@/components/core/buttons/BackButton"
import { Center } from "@/components/ui/center"
import { Text } from "@/components/ui/text"
import { View } from "react-native"
export default function AboutPage() {
    return (
        <View className=" flex-1 bg-red-400">
            <Center>
                <Text size="md" className="text-center text-yellow-300">AAAAAAAA</Text>
               <BackButton title="Voltar"/> 
            </Center>
        </View>
    )
}