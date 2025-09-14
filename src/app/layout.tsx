import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/components/Header";

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
    <html lang="en">
      <body className="antialiased bg-gray-50 min-h-screen w-4/5 mx-auto">
        <Header />
        {children}
      </body>
    </html>
  );
}
