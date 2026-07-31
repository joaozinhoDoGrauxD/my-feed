import { ReactNode } from "react";
import { Text, View } from "react-native";

const Header = (): ReactNode => {
  return (
    <View className="px-6 pt-6 pb-4 border-b border-[#18181b] bg-purple-600">
      <Text className="text-[28px] font-black text-[#fafafa] tracking-tight">My Feed</Text>
      <Text className="text-sm text-[#a1a1aa] mt-1 font-medium">Agregador de RSS</Text>
    </View>
  );
};

export default Header;
