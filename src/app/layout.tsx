import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Componentes
import Navbar from "@/componentes/Navbar";
import Footer from "@/componentes/Footer";
import MenuLateral from "@/componentes/MenuLateral";
import { NavigationEvents } from "@/componentes/NavigationEvents";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Diseños Javi's",
  description: "Tienda de personalización con impresión láser y serigrafía",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col pt-16`}>
        <NavigationEvents>
          <>
            <MenuLateral />
            <Navbar />
          </>
        </NavigationEvents>
        <main className="flex-grow px-4 max-w-7xl mx-auto w-full">
          {children}
        </main>
        <NavigationEvents>
          <Footer />
        </NavigationEvents>
      </body>
    </html>
  );
}