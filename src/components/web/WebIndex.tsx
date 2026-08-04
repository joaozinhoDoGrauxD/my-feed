import NavigateButton from "@/components/core/buttons/NavigateButton";
import Header from "@/components/web/Header";
import Input from "@/components/web/Input";
import { View } from "react-native";

export default function WebIndex () {
    return (
    <View className="flex-1 bg-zinc-900">
      <Header />
      <Input />
        <NavigateButton route="About" title="Teste"/>
    </View>
    )
}