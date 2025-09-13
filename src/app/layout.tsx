import { Toaster } from "react-hot-toast";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex-flex col px-20 py-5`}>
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
      </body>
    </html>
  );
}
