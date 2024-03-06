import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../api/queryclient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lexart",
  description: "Lexart labs fullstack test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`${inter.className} bg-gray-100`}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </body>
    </html>
  );
}
