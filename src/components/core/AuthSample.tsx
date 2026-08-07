import { Button, ButtonText } from "@/gluestack/button";
import { Icon } from "@/gluestack/icon";
import { Box } from "@/gluestack/box";
import { Text } from "@/gluestack/text";
import { registerUser } from "@/services/auth/authFunctions";
import { useSession } from "@/services/auth/session";
import { Lock, Mail, UserPlus } from "lucide-react-native";
import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import CardAuth from "./auth/CardAuth";
import Copyright from "./auth/Copyright";
import FooterLinkAuth from "./auth/FooterLinkAuth";
import HeaderAuth from "./auth/HeaderAuth";
import InputWrapperAuth from "./auth/InputWrapperAuth";

export default function AuthSample() {
  const { signIn } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <View className="flex-1 bg-[#F2F2EC] justify-center items-center px-5 py-5 overflow-hidden">

      <HeaderAuth subtitle="Faça parte da mudança: reporte problemas e colabore com a sua comunidade." />

      <CardAuth
        title="Criar uma Conta"
        subtitle="Crie seu perfil para começar a reportar ocorrências"
      >


        <InputWrapperAuth
          icon={Mail}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <InputWrapperAuth
          icon={Lock}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error && (
          <Box className="bg-red-50 rounded-xl p-2.5 border border-red-300 mb-3.5">
            <Text className="text-red-600 text-xs text-center font-semibold">{error}</Text>
          </Box>
        )}

        <Button
          onPress={handleRegister}
          disabled={loading}
          className="bg-zinc-900 rounded-2xl h-12 justify-center items-center flex-row shadow-sm mt-1 active:bg-zinc-800"
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <>
              <Icon as={UserPlus} size="sm" className="text-white mr-2" />
              <ButtonText className="text-white font-semibold text-sm">Criar Conta</ButtonText>
            </>
          )}
        </Button>

        <FooterLinkAuth
          promptText="Já possui uma conta? "
          linkText="Entrar"
          href="Login"
        />
      </CardAuth>

     <Copyright />
    </View>
  );
}
