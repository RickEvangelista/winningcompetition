import { Toaster } from "react-hot-toast";
import "./globals.css";
import Header from "@/components/Header";
import { auth } from "@/lib/auth";
import { Profile } from "@/types/userRole";
import Footer from "@/components/Footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()
  const profile = session?.user.profile as Profile;
  return (
    <html lang="en">
      <body className={`flex flex-col justify-between px-4 py-2 md:px-20 md:py-5 min-h-screen`}>
        <Header isLoggedIn={!!session} userRole={profile} />
        {children}
        <Toaster
          toastOptions={{
            success: {
              style: {
                color: "#a2ca02",
              },
              iconTheme: {
                primary: "#a2ca02",
                secondary: "white",
              },
            },
            error: {
              style: {
                color: "#f44528",
              },
              iconTheme: {
                primary: "#f44528",
                secondary: "white",
              },
            },
          }}
        />
        <Footer/>
      </body>
    </html>
  );
}
