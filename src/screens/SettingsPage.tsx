import { Box } from "@/components/ui/box"
import ThemeButton from "@/components/core/buttons/ThemeButton"
import SafeAreaWrapper from "@/components/core/SafeAreaWrapper"
import { Heading } from "@/gluestack/heading"
import SignOutButton from "@/components/core/buttons/SignOutButton";
import { Card } from "@/gluestack/card"
import { Center } from "@/components/ui/center"
import { ReactNode } from "react"


function MySettingsBox({ title, button }: { title: string, button: ReactNode }) {

    return (
        <Box className="pb-10">
            <Center>
                <Card size="default" className="p-6 rounded-3xl bg-card border border-border w-full max-w-[400px]">
                    <Heading size="md" className="text-foreground mb-1 font-semibold text-center">
                        {title}
                    </Heading>
                    {button}
                </Card>
            </Center>
        </Box>

    )

}

export default function SettingsPage() {
    return (
        <SafeAreaWrapper className="flex-1 bg-background">
            <Box className="flex-1 px-6 pt-4">
                <Heading size="xl" className="text-foreground font-bold mb-8">
                    Configurações
                </Heading>
                    <MySettingsBox title="Aparência" button={<ThemeButton/>}/>
                    <MySettingsBox title="Sair da conta" button={<SignOutButton/>} />
            </Box>
        </SafeAreaWrapper>
    )
}