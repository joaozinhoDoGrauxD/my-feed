import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useSession } from "@/services/auth/session";
import { Platform } from "react-native";
import { LogOut } from "lucide-react-native";

function LogOutBtn({ styles }: { styles?: string }) {
  const { signOut } = useSession();
  return (
    <Button
      className={`bg-rose-500/10 hover:bg-rose-500/20 active:bg-rose-500/30 border border-rose-500/20 rounded-xl px-3 py-2 flex-row items-center gap-1.5 backdrop-blur-md transition-all duration-200 ${styles || ""}`}
      size="sm"
      onPress={signOut}
    >
      <LogOut size={14} className="text-rose-500" />
      <ButtonText className="text-rose-600 dark:text-rose-300 font-medium text-xs">
        Sair
      </ButtonText>
    </Button>
  );
}

export default function SignOutButton() {
  return (
    <Box>
      {Platform.OS === "web" ? (
        <LogOutBtn />
      ) : (
        <LogOutBtn styles="p-3 m-auto items-center content-center" />
      )}
    </Box>
  );
}