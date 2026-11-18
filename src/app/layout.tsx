import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/tokens.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});


export const metadata: Metadata = {
  title: {
    default: "Quack-education platform",
    template: "%s | Quack",
  },
  description: `Quack is an educational platform that connects students 
                and teachers through personalized learning, interactive lessons, 
                video calls, and seamless communication.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
