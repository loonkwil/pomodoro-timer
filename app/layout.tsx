import "./globals.css";
import type { Metadata } from "next";
import { Fira_Mono } from "next/font/google";

const fira = Fira_Mono({ subsets: ["latin"], weight: "700" });

export const metadata: Metadata = {
  title: "Pomodoro Timer",
  description: "Simple app to track your pomodoro sessions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fira.className}>{children}</body>
    </html>
  );
}
