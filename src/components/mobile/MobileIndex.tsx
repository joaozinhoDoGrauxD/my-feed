import { Box } from "@/gluestack/box"
import { Text } from "@/gluestack/text"
import { SafeAreaView } from "react-native-safe-area-context"
import { Center } from "@/gluestack/center"

export default function MobileIndex() {
    return (
        <Box className="flex-1 bg-red-500">
            <SafeAreaView>
                <Box className="bg-secondary">
                    <Center>
                        <Box className="bg-primary  p-20">
                            <Center>
                                <Text size="sm" bold className="text-primary-foreground">aaaaaaaaa</Text>
                            </Center>
                        </Box>
                    </Center>
                </Box>
            </SafeAreaView>
        </Box>
    )
}