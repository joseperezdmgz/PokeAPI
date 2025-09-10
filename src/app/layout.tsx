import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "PokeAPI",
  description: "PokeAPI - José Pérez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-gray-50 min-h-screen w-4/5 mx-auto">
        {children}
      </body>
    </html>
  );
}
