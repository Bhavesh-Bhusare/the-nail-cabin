import Footer from "@/components/custom/Footer";
import "./globals.css";
import Navbar from "@/components/custom/Navbar";

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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
