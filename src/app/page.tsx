import HeroCarousel from "@/components/HeroCarousel";
import SpiritualBouquet from "@/components/SpiritualBouquet";
import { getTotalOfferings } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Busca o total oficial diretamente do banco no servidor com fallback para 0 se falhar
  let initialTotal = 0;
  try {
    initialTotal = await getTotalOfferings();
  } catch (error) {
    console.error("Falha ao buscar total inicial:", error);
  }

  return (
    <main className="min-h-screen">
      <HeroCarousel />
      <SpiritualBouquet initialTotal={initialTotal} />

      {/* Footer */}
      <footer className="bg-marian-deep py-10 px-6 text-center">
        <p className="font-serif-display text-lg italic" style={{ color: 'hsl(40, 60%, 80%)' }}>
          "Ó Maria concebida sem pecado, rogai por nós que recorremos a Vós"
        </p>
        <div className="gold-divider w-24 mx-auto my-4" />
        <p className="font-sans-body text-xs tracking-widest" style={{ color: 'hsl(210, 30%, 60%)' }}>
          Lucas & Amanda · João Pessoa — PB · 2027
        </p>
      </footer>
    </main>
  );
}
