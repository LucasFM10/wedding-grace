import HeroCarousel from "@/components/HeroCarousel";
import SpiritualBouquet from "@/components/SpiritualBouquet";
import { getTotalOfferings } from "./actions";

/**
 * Página principal - Restauração do Carrossel Original
 * Removida a imagem estática de IA/Unsplash e reinserido o HeroCarousel 
 * que utiliza as fotos locais da pasta public/assets.
 */

export const dynamic = "force-dynamic";

export default async function Home() {
  // Busca o total acumulado (Mock)
  const initialTotal = await getTotalOfferings();

  return (
    <main className="min-h-screen bg-white">
      {/* O HeroCarousel já inclui o Countdown e as fotos do casal */}
      <HeroCarousel />
      
      <div className="py-12">
        <SpiritualBouquet initialTotal={initialTotal} />
      </div>
      
      <footer className="py-12 bg-gray-50 text-center text-gray-400 text-sm">
        <p className="font-serif italic text-base mb-2">"Onde quer que estejas, é lá que eu estarei."</p>
        <p>© 2025 Lucas & Amanda — Convite de Casamento</p>
      </footer>
    </main>
  );
}
