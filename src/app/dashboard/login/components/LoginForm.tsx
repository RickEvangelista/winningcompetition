"use client";

import Input from "@/components/Input";
import Button from "@/components/Button";
import useFeedback from "@/hooks/useFeedback";
import { getSession, signIn } from "next-auth/react";

export default function LoginForm() {
  const { showMessage } = useFeedback();

  const handleSubmit = async (formData: FormData) => {
    const identifier = (formData.get("identifier") as string)?.trim();
    const password = (formData.get("password") as string)?.trim();

    if (!identifier || !password) {
      showMessage({ success: false, message: "Preencha todos os campos." });
      return;
    }

    const result = await signIn("credentials", {
      identifier,
      password,
      redirect: false,
    });

    if (result?.error) {
      showMessage({ success: false, message: "Usuário ou senha inválidos"});
      return;
    }

    let redirectUrl = "/"
    const session = await getSession();
    const profile = session?.user?.profile;
    if(profile === "Administrador") redirectUrl = "/dashboard/eventos"
    if(profile === "Vendedor") redirectUrl = "/dashboard/ingressos/criar"
    if(profile === "Validador") redirectUrl = "/dashboard/validacao"

    window.location.href = redirectUrl;
  };

  return (
    <form
      action={handleSubmit}
      className="w-full md:w-100 flex flex-col p-5 gap-5 border-4 border-custom-blue rounded-lg"
    >
      <h1 className="text-4xl font-semibold text-center text-custom-blue">
        Login de usuário
      </h1>
      <Input
        label="Email ou CPF:"
        name="identifier"
        placeholder="Digite o email ou CPF"
      />
      <Input
        label="Senha:"
        type="password"
        name="password"
        placeholder="Digite a senha por favor"
      />
      <Button>Entrar</Button>
    </form>
  );
}
