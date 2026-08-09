import { useSession } from "@/services/auth/session";
import { useState } from "react";
import { registerUser } from "@/services/auth/authFunctions";

export const useAuth = () => {
const { signIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Preencha todos os campos para continuar.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await signIn(email, password);
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

const handleRegister = async () => {
    if (!email || !password) {
      setError("Preencha todos os campos para continuar.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await registerUser(email, password);
      await signIn(email, password);
    } catch (err: any) {
      setError(err.message || "Erro ao registrar usuário.");
    } finally {
      setLoading(false);
    }
  };

  return {setEmail, setPassword, handleRegister, handleLogin, email, password, error, loading}

} 