import { app, PORT } from "@/app";

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})