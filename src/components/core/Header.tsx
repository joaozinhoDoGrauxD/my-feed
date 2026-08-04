import { ReactNode } from "react";
import { Box } from "../ui/box";
import { Text } from "../ui/text";
import { useRoute } from "@react-navigation/native";
export default function Header({ children }: { children: ReactNode }) {
    const route = useRoute()
    const { name } = route
    return (
        <Box className="bg-primary items-center content-center">
            <Text bold size="6xl" className="m-auto text-primary-foreground"> Your route is: {name}</Text>
            <Box className="bg-primary rounded-full m-auto mr-10 mt-2 mb-2">
                {children}
            </Box>
        </Box>
    )
}