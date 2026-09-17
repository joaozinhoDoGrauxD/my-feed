import { Box } from "@/gluestack/box";
import { Heading } from "@/gluestack/heading";
import { Center } from "@/components/ui/center";
import { Text } from "@/gluestack/text";
import { ReactNode } from "react";
import ThemeButton from "../../core/buttons/ThemeButton";
import SignOutButton from "@/components/core/buttons/SignOutButton";
import { Radio } from "lucide-react-native";
import useTheme from "@/hooks/useTheme";

const Header = (): ReactNode => {
  const { isDark } = useTheme();

  return (
    <Box
      className={`px-6 py-3.5 border-b sticky top-0 z-50 backdrop-blur-2xl transition-all duration-300 ${
        isDark
          ? "border-[rgba(255,255,255,0.1)] bg-[rgba(15,23,42,0.8)]"
          : "border-[rgba(0,0,0,0.1)] bg-[rgba(255,255,255,0.85)]"
      }`}
    >
      <Box className="max-w-[850px] w-full mx-auto flex-row items-center justify-between">
        <Center className="flex-row gap-3 items-center">
          <Box className="p-2 rounded-xl bg-[rgba(99,102,241,0.1)] border border-[rgba(129,140,248,0.3)] backdrop-blur-md">
            <Radio size={18} className="text-indigo-500" />
          </Box>
          <Heading
            bold
            size="2xl"
            className={`tracking-tight font-extrabold ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            My Feed
          </Heading>
          <Box className="px-2.5 py-0.5 rounded-full bg-[rgba(99,102,241,0.1)] border border-[rgba(129,140,248,0.2)] flex-row items-center gap-1.5 backdrop-blur-md">
            <Box className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <Text size="xs" className="text-indigo-600 dark:text-indigo-300 font-semibold tracking-wider uppercase text-[10px]">
              Agregador de RSS
            </Text>
          </Box>
        </Center>

        <Box
          className={`flex-row items-center gap-2 p-1 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
            isDark ? "bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)]" : "bg-[rgba(0,0,0,0.05)] border-[rgba(0,0,0,0.1)]"
          }`}
        >
          <ThemeButton />
          <SignOutButton />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;