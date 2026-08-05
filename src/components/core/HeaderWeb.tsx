import { ReactNode } from "react";
import { Box } from "../ui/box";
import { Heading } from "../ui/heading";
import ThemeButton from "./buttons/ThemeButton";
import { Text } from "../ui/text";


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
