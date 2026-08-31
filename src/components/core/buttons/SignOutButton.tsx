import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useSession } from "@/services/auth/session";
import { Platform } from "react-native";

function LogOutBtn({ styles }: { styles?: string }) {
    const { signOut } = useSession();
    return (
        <Button className={styles} variant="destructive" size="sm" onPress={signOut}>
            <ButtonText>SignOut</ButtonText>
        </Button>
    )
}

export default function SignOutButton() {

    return (
        <Box>
            {
                Platform.OS === 'web' ? (
                    <LogOutBtn />
                ) : (
                    <LogOutBtn styles="p-4 m-auto items-center content-center" />
                )
            }

        </Box>
    )

}