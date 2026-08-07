import Header from "@/components/web/header/HeaderWeb";
import Input from "@/components/web/input/Input";
import { Box } from "@/gluestack/box";

export default function WebIndex () {
    return (
      <Box className="flex-1 bg-primary">
      <Header/>
      <Input />
      </Box>
    )
}