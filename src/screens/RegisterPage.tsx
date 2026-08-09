import React from "react";
import AuthComponent from "@/components/core/auth/AuthComponent";
import { UserPlus } from "lucide-react-native";

export default function RegisterPage() {
  return (
    <AuthComponent
      mode="register"
      icon={UserPlus}
      subHeader="Interaja! Suas notícias, podcasts e notificações em primeira mão"
      titleCard="Criar uma conta"
      subCard="Crie o perfil para usar o app"
      promptText="Já possui uma conta? "
      linkText="Entrar"
      href="Login"
    />
  );
}
