import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import LoadingIndicator from "@/components/LoadingIndicator";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Excel Mastery AI",
  description: "Maîtrisez Excel avec l'aide de l'IA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={geist.className}>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="pt-16">{children}</main>
            <LoadingIndicator />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
