import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./prisma";
import { signInSchema } from "@/app/dashboard/login/schemas/signInSchema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: { signIn: "/" },
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      id: "credentials",
      credentials: {
        identifier: { label: "Email ou CPF", type: "text" },
        password: { label: "Senha:", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { identifier, password } = await signInSchema.parseAsync(
            credentials
          );

          const user = await prisma.usuario.findFirst({
            where: {
              OR: [
                { pessoa: { cpf: identifier } },
                { pessoa: { email: identifier } },
              ],
            },
            include: { pessoa: true, perfil: true },
          });

          if (!user) return null;

          const verifyPassword = await bcrypt.compare(password, user.senha);

          if (!verifyPassword) return null;

          return {
            id: String(user.id_usuario),
            name: user.pessoa.nome_completo,
            email: user.pessoa.email,
            profile: user.perfil.titulo_perfil,
          };
          
        } catch (error: any) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      return user ? { ...token, ...user } : token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: { ...session.user, id: token.id, profile: token.profile },
    }),
  },
});
