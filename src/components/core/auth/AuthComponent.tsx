import React, { ReactNode } from "react";
import { Center } from "@/gluestack/center";
import { Text } from "@/gluestack/text";
import { Box } from "@/gluestack/box";
import { Spinner } from "@/gluestack/spinner";
import { Button, ButtonText } from "@/gluestack/button";
import { Icon } from "@/gluestack/icon";
import HeaderAuth from "@/components/core/auth/HeaderAuth";
import CardAuth from "@/components/core/auth/CardAuth";
import { useAuth } from "@/hooks/useAuth";
import InputWrapperAuth from "@/components/core/auth/InputWrapperAuth";
import FooterLinkAuth from "@/components/core/auth/FooterLinkAuth";
import Copyright from "@/components/core/auth/Copyright";
import { authComponent } from "@/types/authComponent.types";
import { Mail, Lock, User } from "lucide-react-native";
import ThemeButton from "@/components/core/buttons/ThemeButton";
import SafeAreaWrapper from "../SafeAreaWrapper";
import { Platform } from "react-native";
import { useSession } from "@/services/auth/session";

export default function AuthComponent({
  mode,
  icon,
  subHeader,
  titleCard,
  subCard,
  promptText,
  linkText,
  href
}: authComponent) {
  const {
    email,
    password,
    username,
    setEmail,
    setPassword,
    setUsername,
    error,
    loading,
    handleLogin,
    handleRegister,
    handleGoogleLogin,
    isGoogleReady
  } = useAuth();

  const {session} = useSession()
  const handleSubmit = mode === "login" ? handleLogin : handleRegister;

  const LoginInputs = [
    {
      icon: Mail,
      placeholder: "E-mail",
      value: email,
      func: setEmail
    }, {

      icon: Lock,
      placeholder: "Senha",
      value: password,
      func: setPassword
    }
  ]

  const RegisterInputs = [
    {
      icon: User,
      placeholder: "Username",
      value: username,
      func: setUsername
    },
    {
      icon: Mail,
      placeholder: "E-mail",
      value: email,
      func: setEmail
    }, {
      icon: Lock,
      placeholder: "Senha",
      value: password,
      func: setPassword
    }
  ]

  function AllInputs(obj: any): ReactNode {
    return (
      obj.map((props: any, index: any) => (
        <InputWrapperAuth
          icon={props.icon}
          placeholder={props.placeholder}
          value={props.value}
          onChangeText={props.func}
          key={index}
          {...(props.placeholder === 'E-mail' && { keyboardType: "email-address" })}
          {...(props.placeholder === "Senha" && { secureTextEntry: true })}
          {...(props.placeholder === "Username" && { keyboardType: "default" })}
        />
      ))
    )
  }

  return (
    <SafeAreaWrapper>
      <Box className="flex-1 bg-background justify-center items-center px-5 py-5">
        {Platform.OS === 'web' && (
          <Box className="mb-40 ml-190">
            <ThemeButton />
          </Box>
        )}
        <Box className={session ? "mb-20" : "mb-20 gap-5"}>
          {Platform.OS !== 'web' && <ThemeButton />}
          <Center>
            <HeaderAuth subtitle={subHeader} />
            <CardAuth title={titleCard} subtitle={subCard}>

              {mode === "login" ? AllInputs(LoginInputs) : AllInputs(RegisterInputs)}

              {error && (
                <Box className="bg-destructive/10 rounded-xl p-2.5 border border-destructive/20 mb-3.5">
                  <Text className="text-destructive text-xs text-center font-semibold">{error}</Text>
                </Box>
              )}

              <Button
                onPress={handleSubmit}
                disabled={loading}
                className="w-full bg-primary rounded-2xl h-12 flex-row justify-center items-center shadow-sm mt-2 active:bg-primary/90"
              >
                {loading ? (
                  <Spinner color="#FFFFFF" size="small" />
                ) : (
                  <Box className="flex-row items-center justify-center gap-2">
                    <Icon as={icon} size="sm" className="text-primary-foreground" />
                    <ButtonText className="text-primary-foreground font-semibold text-sm">
                      {mode === "login" ? "Entrar" : "Criar Conta"}
                    </ButtonText>
                  </Box>
                )}
              </Button>

              <Button
                onPress={handleGoogleLogin}
                disabled={loading}
                className="w-full bg-secondary border border-border rounded-2xl h-12 flex-row justify-center items-center shadow-sm mt-3 active:bg-secondary/80"
              >
                <ButtonText className="text-secondary-foreground font-semibold text-sm">
                  Continuar com o Google
                </ButtonText>
              </Button>

              <FooterLinkAuth
                promptText={promptText}
                linkText={linkText}
                href={href}
              />
              <Copyright />
            </CardAuth>
          </Center>
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
}
