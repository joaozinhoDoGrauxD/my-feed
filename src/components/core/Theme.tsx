import '@/global.css';
import { ReactNode } from "react";
import { ThemeProvider } from "@/hooks/useTheme";
import { GluestackUIProvider } from '@/gluestack/gluestack-ui-provider';
import useTheme from '@/hooks/useTheme';

function GluestackLayout({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return <GluestackUIProvider mode={theme}>{children}</GluestackUIProvider>;
}

export default function Theme({ children }: { children: ReactNode }) {

    return (
        <ThemeProvider>
            <GluestackLayout>
                {children}
            </GluestackLayout>
        </ThemeProvider>
    )
}
