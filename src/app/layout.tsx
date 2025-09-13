
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex-flex col px-20 py-5`}
      >
        {children}
      </body>
    </html>
  );
}
