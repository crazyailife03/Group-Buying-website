import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "團購趣 GroupBuyFun - 最優惠的團購平台",
  description: "嚴選好物，揪團更划算！享受最低團購價，多種組合優惠任你選。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-50 font-sans">
        <Suspense>
          <Header />
        </Suspense>
        <main className="flex-1">
          <Suspense>{children}</Suspense>
        </main>
        <Footer />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
