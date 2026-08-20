import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import ToastContainer from "@/components/ToastContainer";

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
      <body className="bg-[#F7F8FA] font-sans antialiased text-gray-800">
        <AppProvider>
          {children}
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}