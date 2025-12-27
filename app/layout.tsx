import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";
import "./globals.css";
import QueryProvider from "./queryProvider";

export const metadata = {
  title: "The Nail Cabin | Luxury Nail Art Studio",
  description: "Premium nail art studio in Malad, Mumbai",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Toaster />
          <Navbar />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
