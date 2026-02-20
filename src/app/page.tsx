import Image from "next/image";
import SizingQuiz from "@/components/SizingQuiz";
import BookingCalendar from "@/components/BookingCalendar";
import { Sparkles, ShieldCheck, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h2 className="font-serif text-5xl lg:text-7xl font-bold leading-tight mb-6">
              L&apos;élégance sans compromis. <br/>
              <span className="text-primary/60 italic">Louez l&apos;exceptionnel.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-xl">
              Découvrez notre collection de costumes de mariage haut de gamme.
              Service de conciergerie, pressing inclus et livraison partout en France.
            </p>
            <div className="flex gap-4">
              <a href="#booking" className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary/90 transition-all">
                Réserver ma tenue
              </a>
              <a href="#sizing" className="border border-primary/20 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-muted transition-all">
                Trouver ma taille
              </a>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-muted/30 -z-0 hidden lg:block" />
      </section>

      {/* Features */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center mb-6 shadow-sm">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">Qualité Luxe</h3>
              <p className="text-muted-foreground text-sm">Laines italiennes et coupes impeccables pour un tombé parfait.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center mb-6 shadow-sm">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">Logistique J-2</h3>
              <p className="text-muted-foreground text-sm">Livraison 48h avant votre événement pour un essayage serein.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-background flex items-center justify-center mb-6 shadow-sm">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">Pressing Inclus</h3>
              <p className="text-muted-foreground text-sm">Ne vous souciez de rien. Le retour et le nettoyage sont gérés par nos soins.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sizing Engine */}
      <section id="sizing" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/50 mb-4 block">Intelligence Artificielle</span>
              <h2 className="font-serif text-4xl font-bold mb-6">Trouvez la coupe parfaite.</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Notre algorithme de sizing analyse vos mesures pour vous recommander la coupe idéale parmi nos modèles Slim, Regular et Tailored.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm font-medium">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Précision millimétrée
                </li>
                <li className="flex items-center gap-3 text-sm font-medium">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Conseils morphologiques
                </li>
              </ul>
            </div>
            <SizingQuiz />
          </div>
        </div>
      </section>

      {/* Booking Engine */}
      <section id="booking" className="py-24 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-4xl font-bold mb-4">Vérifiez la disponibilité</h2>
            <p className="text-muted-foreground">Sélectionnez la date de votre mariage pour voir les options disponibles.</p>
          </div>
          <BookingCalendar />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-4xl font-bold mb-8 italic">Prêt à briller pour le grand jour ?</h2>
          <button className="border border-primary-foreground/30 px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-primary-foreground hover:text-primary transition-all">
            Explorer la collection
          </button>
        </div>
      </section>
    </div>
  );
}
