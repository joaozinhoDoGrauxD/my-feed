import { ReactNode } from "react"
import GluestackLayout from "@/GluestackLayout";
import useTheme from "@/hooks/useTheme";
import Header from "@/components/core/Header";
import ThemeButton from "@/components/core/buttons/ThemeButton";

export default function Theme({ children }: { children: ReactNode }) {
    const { theme, setTheme } = useTheme()
    return (
        <GluestackLayout theme={theme}>
            <Header>
                <ThemeButton func={setTheme}></ThemeButton>
            </Header>
            {children}
        </GluestackLayout>
    )
}
