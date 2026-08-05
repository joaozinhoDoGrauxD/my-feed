import { Platform} from "react-native";
import MobileIndex from "@/components/mobile/MobileIndex";
import WebIndex from "@/components/web/WebIndex";
import Theme from "@/components/core/Theme";
export default function IndexPage() {
    return (
        <Theme>
        {Platform.OS === 'web' ? ( <WebIndex/> ) : ( <MobileIndex/> )}
        </Theme>
    )
}