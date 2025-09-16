'use server';

import { auth } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Você precisa estar logado para acessar esta página.</p>
      </div>
    );
  }

  const { name, email, profile, id } = session.user;

  return (
    <main className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-4">Meu Perfil</h1>
      
      <div className="mb-6">
        <p><strong>Nome:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Perfil:</strong> {profile}</p>
        <p><strong>ID:</strong> {id}</p>
      </div>

      {/* LogoutButton é client component */}
      <LogoutButton />
    </main>
  );
}

