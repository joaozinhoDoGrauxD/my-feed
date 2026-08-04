import { View } from "react-native"
import NavigateButton from "../core/buttons/NavigateButton"
export default function MobileIndex() {
    return (
        <View className="flex-1 bg-cyan-300 content-center">
            <View className="mt-60 bg-yellow-400 ">
                <NavigateButton route="About" title="Teste" />
            </View>
        </View>
    )
}