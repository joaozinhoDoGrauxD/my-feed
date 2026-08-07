import { Box } from "@/gluestack/box";
import { Heading } from "@/gluestack/heading";
import { Text } from "@/gluestack/text";
import { ReactNode } from "react";
import ThemeButton from "../../core/buttons/ThemeButton";


const Header = (): ReactNode => {
  return (
    <Box className="bg-primary p-5">
      <Box className="flex gap-3">
      <Box>
        <ThemeButton/>
      </Box>
        <Heading className="text-primary-foreground" italic bold size="3xl">My Feed</Heading>
        <Text className="text-primary-foreground" size="sm">Agregador de RSS</Text>
      </Box>
    </Box>
  );
};

export default Header;
