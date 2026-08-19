import { useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import { useSession } from "@/services/auth/session";
import { Platform } from "react-native";
import { registerUser } from "@/services/auth/authFunctions";

export interface UseAuthReturn {
  email: string;
  username: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setUsername : (usernname: string) => void;
  error: string | null;
  loading: boolean;
  handleLogin: () => Promise<void>;
  handleRegister: () => Promise<void>;
  handleGoogleLogin: () => void;
  isGoogleReady: boolean;
}

export function useAuth(): UseAuthReturn {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string>("")
  const [role, setRole] = useState<"user" | "admin">("user")

  const { signIn, signInWithGoogle: contextSignInWithGoogle } = useSession();

  const redirectUri = makeRedirectUri({
    preferLocalhost: true,
  });

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    redirectUri,
  });

  useEffect(() => {
    console.log("Status da Resposta do Google:", response?.type, response);

    if (response?.type === "success") {
      // No fluxo id_token (Implicit/AuthSession), o token vem em params ou authentication
      const idToken = response.params?.id_token || response.authentication?.idToken;

      console.log("ID Token retornado:", idToken ? "Capturado com sucesso" : "NULO");

      if (idToken) {
        handleGoogleAuth(idToken);
      } else {
        setError("Não foi possível obter o token do Google.");
      }
    } else if (response?.type === "error") {
      console.error("Erro retornado pelo Expo Google Auth:", response.error);
      setError("Erro ao autenticar com o Google.");
    }
  }, [response]);

  const handleGoogleAuth = async (idToken: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Enviando idToken para o backend...");
      await contextSignInWithGoogle(idToken);
      console.log("Login no backend concluído!");
    } catch (err: any) {
      console.error("Erro no retorno da API do backend:", err);
      setError(err.message || "Erro de servidor ao autenticar com Google");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setError(null);
    if (Platform.OS === "web") {
      // Abre o pop-up ou redireciona a janela
      promptAsync();
    } else {
      promptAsync();
    }
  };

  const errorHandling = (error: any, msg: string): string => {
    const genericMessage = error.message || msg;
    const errors = error?.errors || error?.response?.data?.errors;

    if (Array.isArray(errors)) {
      const emailError = errors.find((err: any) => err?.field === "email");
      const passwordError = errors.find((err: any) => err?.field === "password");
      const usernameError = errors.find((err: any) => err?.field === "username")
      switch (true) {
        case (emailError && passwordError && usernameError):
        return `${emailError.message}, ${passwordError.message} e ${usernameError.message}`;

        case (emailError && passwordError):
        return `${emailError.message} e ${passwordError.message}`

        case (emailError && usernameError):
        return `${emailError.message} e ${usernameError.message}`

        case (usernameError && passwordError):
        return `${usernameError.message} e ${passwordError.message}`

        case (emailError):
        return emailError.message

        case (passwordError):
        return passwordError.message  

        case (usernameError):
        return usernameError.message 
      }
      
    }

    return genericMessage;
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signIn(email, password);
    } catch (err: any) {
      const errorMessage: string = errorHandling(err, 'Erro ao realizar login')
      setError(errorMessage)
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !username) {
      setError("Preencha todos os campos para continuar.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await registerUser(username, email, password, role);
      await signIn(email, password);
    } catch (err: any) {
      const errorMessage: string = errorHandling(err, "Erro ao registrar usuário.")
      setError(errorMessage)
    } finally {
      setLoading(false);
    }
  };

  return { email, username, password, setEmail, setUsername, setPassword, error, loading, handleLogin, handleRegister, handleGoogleLogin, isGoogleReady: !!request, };
}