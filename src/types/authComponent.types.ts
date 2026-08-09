import { LucideIcon } from "lucide-react-native"

export interface authComponent {
    mode: "login" | "register";
    icon: LucideIcon;
    subHeader: string;
    titleCard: string;
    subCard: string;
    promptText: string;
    linkText: string;
    href: string;
}
