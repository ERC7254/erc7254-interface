import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BlastThemeProvider } from "@/contexts/ChakraProvider";
import { chakraPetch } from "@/constants/fonts";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${chakraPetch.className}`}>
        <BlastThemeProvider cookies={"blasttheme"}>
          {children}
        </BlastThemeProvider>
      </body>
    </html>
  );
}
