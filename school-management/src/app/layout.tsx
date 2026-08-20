import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import ToastContainer from "@/components/ToastContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SchooLama - Institutional School Management System",
  description: "Modern Multi-Role School Management Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F7F8FA] antialiased text-gray-800`}>
        <AppProvider>
          {children}
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}