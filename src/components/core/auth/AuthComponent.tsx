import React, { ReactNode, useEffect } from "react";
import { Dimensions, Platform } from "react-native";
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
import { useSession } from "@/services/auth/session";
import useTheme from "@/hooks/useTheme";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Esferas luminosas que se movem de forma contínua e sem ordem fixa no fundo
function FloatingOrb({
  color,
  size,
  initialX,
  initialY,
}: {
  color: string;
  size: number;
  initialX: number;
  initialY: number;
}) {
  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Animação dinâmica para o eixo X
    translateX.value = withRepeat(
      withTiming(Math.random() * (SCREEN_WIDTH - size * 0.5), {
        duration: 9000 + Math.random() * 5000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    // Animação dinâmica para o eixo Y
    translateY.value = withRepeat(
      withTiming(Math.random() * (SCREEN_HEIGHT - size * 0.5), {
        duration: 10000 + Math.random() * 5000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );

    // Efeito de respiração/pulsação de tamanho
    scale.value = withRepeat(
      withTiming(1.25, {
        duration: 7000 + Math.random() * 3000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        animatedStyle,
      ]}
    />
  );
}

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
  const { isDark } = useTheme();
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
  } = useAuth();

  const { session } = useSession();
  const handleSubmit = mode === "login" ? handleLogin : handleRegister;

  const LoginInputs = [
    {
      icon: Mail,
      placeholder: "E-mail",
      value: email,
      func: setEmail
    },
    {
      icon: Lock,
      placeholder: "Senha",
      value: password,
      func: setPassword
    }
  ];

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
    },
    {
      icon: Lock,
      placeholder: "Senha",
      value: password,
      func: setPassword
    }
  ];

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
    );
  }

  return (
    <SafeAreaWrapper>
      <Box className="relative flex-1 bg-background justify-center items-center px-5 py-8 overflow-hidden">
        
        {/* Camada de Orbes Flutuantes em Segundo Plano */}
        <Box className="absolute inset-0 pointer-events-none blur-[100px] opacity-60">
          <FloatingOrb
            color={isDark ? "rgba(99, 102, 241, 0.45)" : "rgba(99, 102, 241, 0.3)"}
            size={380}
            initialX={-60}
            initialY={-60}
          />
          <FloatingOrb
            color={isDark ? "rgba(14, 165, 233, 0.4)" : "rgba(56, 189, 248, 0.25)"}
            size={400}
            initialX={SCREEN_WIDTH - 150}
            initialY={SCREEN_HEIGHT - 250}
          />
          <FloatingOrb
            color={isDark ? "rgba(168, 85, 247, 0.35)" : "rgba(192, 132, 252, 0.2)"}
            size={320}
            initialX={100}
            initialY={SCREEN_HEIGHT / 3}
          />
        </Box>

        {/* Botão de Tema Posicionado */}
        <Box className="absolute top-6 right-6 z-20">
          <ThemeButton />
        </Box>

        {/* Conteúdo Principal de Login/Registro */}
        <Box className="z-10 w-full max-w-[420px] items-center my-auto">
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
              className="w-full bg-primary rounded-2xl h-12 flex-row justify-center items-center shadow-md mt-2 active:opacity-80 transition-all"
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
              className="w-full bg-secondary border border-border rounded-2xl h-12 flex-row justify-center items-center shadow-sm mt-3 active:opacity-80 transition-all"
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
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
}