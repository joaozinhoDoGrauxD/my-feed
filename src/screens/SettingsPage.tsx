import { Box } from "@/components/ui/box"
import ThemeButton from "@/components/core/buttons/ThemeButton"
import SafeAreaWrapper from "@/components/core/SafeAreaWrapper"
import { Heading } from "@/gluestack/heading"
import { Card } from "@/gluestack/card"

export default function SettingsPage() {
    return (
        <SafeAreaWrapper className="flex-1 bg-background">
            <Box className="flex-1 px-6 pt-4">
                <Heading size="xl" className="text-foreground font-bold mb-8">
                    Configurações
                </Heading>

                <Box className="flex-1 justify-center items-center pb-10">
                    <Card size="default" className="p-6 rounded-3xl bg-card border border-border w-full max-w-[400px]">
                        <Heading size="md" className="text-foreground mb-4 font-semibold text-center">
                            Aparência
                        </Heading>
                        <ThemeButton />
                    </Card>
                </Box>
            </Box>
        </SafeAreaWrapper>
    )
}