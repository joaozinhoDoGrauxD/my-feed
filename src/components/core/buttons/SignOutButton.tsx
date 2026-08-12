import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useSession } from "@/services/auth/session";

export default function SignOutButton() {
    const { signOut } = useSession();

    return (
        <Box>
            <Button variant="destructive" size="sm" onPress={signOut}>
                <ButtonText>SignOut</ButtonText>
            </Button>
        </Box>
    )

}