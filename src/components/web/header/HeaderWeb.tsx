import { Box } from "@/gluestack/box";
import { Heading } from "@/gluestack/heading";
import { Center } from "@/components/ui/center";
import { Text } from "@/gluestack/text";
import { ReactNode } from "react";
import ThemeButton from "../../core/buttons/ThemeButton";
import SignOutButton from "@/components/core/buttons/SignOutButton";


const Header = (): ReactNode => {
  return (
    <Box className="px-6 py-4 border-b border-border/10 shadow-sm">
      <Box className="max-w-[800px] w-full mx-auto flex-row items-center justify-between">
        <Center className="flex-row gap-3">
          <Heading  italic bold size="3xl">My Feed</Heading>
          <Text size="sm">Agregador de RSS</Text>
        </Center>
        <Box className="flex-row">
          <ThemeButton/>
          <SignOutButton/>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
