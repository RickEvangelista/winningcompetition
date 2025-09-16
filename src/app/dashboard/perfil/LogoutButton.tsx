'use client';

import { signOut } from "next-auth/react";
import { handleSignOut } from "@/app/dashboard/perfil/actions/signOut";

interface LogoutButtonProps {
  cor?: string;
}

export default function LogoutButton({ cor }: LogoutButtonProps) {
  return (
    <form action={handleSignOut}>
      <button 
        type="submit"
        className="w-full bg-custom-competition-orange hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
      >
        Sair
      </button>
    </form>
  );
}
