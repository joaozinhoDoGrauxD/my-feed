import { useNavigation } from "@react-navigation/native";
import { Button, ButtonText } from "@/gluestack/button";

interface NavigateButtonProps {
  route: string;
  title: string;
  variant?: "default" | "outline" | "link";
}

export default function NavigateButton({
  route,
  title,
  variant = "default",
}: NavigateButtonProps) {
  const navigation = useNavigation<any>();

  return (
    <Button
      variant={variant}
      className="rounded-xl px-4 py-2"
      onPress={() => navigation.navigate(route)}
    >
      <ButtonText>{title}</ButtonText>
    </Button>
  );
}