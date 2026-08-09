import { Platform } from "react-native";
import MobileIndex from "@/components/mobile/MobileIndex";
import WebIndex from "@/components/web/WebIndex";

export default function IndexPage() {
    return Platform.OS === 'web' ? <WebIndex /> : <MobileIndex />;
}