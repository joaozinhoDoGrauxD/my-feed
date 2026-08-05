import { Box } from "@/gluestack/box";
import Input from "@/components/web/input/Input";
import Header from "@/components/core/HeaderWeb";

export default function WebIndex () {
    return (
      <Box className="flex-1 bg-primary">
      <Header/>
      <Input />
      </Box>
    )
}