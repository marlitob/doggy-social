import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/app/NavBar";
import AuthProvider from "./auth/Provider";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doggy Social",
  description: "Social Network for Doggies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="winter">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className={"p-5"}>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
