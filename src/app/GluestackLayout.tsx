import '@/global.css';
import { GluestackUIProvider, ModeType } from '@/components/ui/gluestack-ui-provider';

export default function GluestackLayout({
  children, theme
}: {
  children: React.ReactNode, theme?: ModeType 
}) {
  return <GluestackUIProvider mode={theme}>{children}</GluestackUIProvider>;
}
