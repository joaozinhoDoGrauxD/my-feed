import Header from "@/components/web/header/HeaderWeb";
import Input from "@/components/web/input/Input";
import { Box } from "@/gluestack/box";

export default function WebIndex () {
    return (
      <Box className="flex-1 bg-background">
        <Header/>
        <Box className="max-w-[800px] w-full mx-auto flex-1">
          <Input />
        </Box>
      </Box>
    )
}