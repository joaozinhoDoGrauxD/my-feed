import { Box } from "@/components/ui/box"
import { signOutFunction } from "@/services/auth/authFunctions"
import { Button, ButtonText } from "@/components/ui/button"
export default function SignOutButton() {
    return (
        <Box>
            <Button variant="destructive" size="sm" onPress={signOutFunction}>
                <ButtonText>SignOut</ButtonText>
            </Button>
        </Box>
    )

}