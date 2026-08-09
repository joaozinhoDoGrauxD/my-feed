import React from "react";
import AuthComponent from "@/components/core/auth/AuthComponent";
import { LogIn } from "lucide-react-native";

export default function LoginPage() {
  return (
    <AuthComponent
      mode="login"
      icon={LogIn}
      subHeader="Está há um passo de aproveitar nossa experiência"
      titleCard="Entrar no app"
      subCard="Faça o login para usar o app"
      promptText="Não possui uma conta? "
      linkText="Cadastrar"
      href="Register"
    />
  );
}
