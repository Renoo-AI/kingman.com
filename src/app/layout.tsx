import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Groomwear Luxe | Location de Costumes de Mariage",
  description: "Plateforme haut de gamme de location de costumes pour mariés et garçons d&apos;honneur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <header className="border-b">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <h1 className="font-serif text-2xl font-bold tracking-tight">GROOMWEAR</h1>
            <nav className="hidden space-x-8 md:flex">
              <a href="/" className="text-sm font-medium uppercase tracking-widest hover:text-primary/70">Collection</a>
              <a href="/essaye" className="text-sm font-medium uppercase tracking-widest hover:text-primary/70">Essayage</a>
              <a href="/admin/operations" className="text-sm font-medium uppercase tracking-widest hover:text-primary/70">Admin</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t py-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Groomwear Luxe. Service de Conciergerie Logistique.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
