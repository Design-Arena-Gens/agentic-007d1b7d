import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Visa-Sponsored Job Finder",
  description: "Find visa-sponsored jobs in UK, Ireland, Belgium, Netherlands, and Italy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
