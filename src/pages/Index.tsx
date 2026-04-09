import HeroCarousel from "@/components/HeroCarousel";
import SpiritualBouquet from "@/components/SpiritualBouquet";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroCarousel />
      <SpiritualBouquet />

      {/* Footer */}
      <footer className="bg-marian-deep py-10 px-6 text-center">
        <p className="font-serif-display text-lg italic" style={{ color: 'hsl(40, 60%, 80%)' }}>
          "Ó Maria concebida sem pecado, rogai por nós que recorremos a Vós"
        </p>
        <div className="gold-divider w-24 mx-auto my-4" />
        <p className="font-sans-body text-xs tracking-widest" style={{ color: 'hsl(210, 30%, 60%)' }}>
          Lucas & Noiva · João Pessoa — PB · 2025
        </p>
      </footer>
    </main>
  );
};

export default Index;
