import NextAuth, { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    profile: string;
    id: string;
  }
}

declare module "next-auth" {
  interface User extends DefaultUser {
    profile: string;
    id: string;
  }

  interface Session extends DefaultSession {
    user: {
      profile: string;
      id: string;
    };
  }
}
