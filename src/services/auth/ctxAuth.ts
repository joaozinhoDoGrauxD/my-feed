import { createContext } from "react";
import { AuthContextType } from "@/src/types/authContext.types";


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
