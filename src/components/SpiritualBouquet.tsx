"use client";

import { useState, useEffect } from "react";
import PrayerModal from "./PrayerModal";

const GOAL = 1830;

interface SpiritualBouquetProps {
  initialTotal: number;
}

const SpiritualBouquet = ({ initialTotal }: SpiritualBouquetProps) => {
  // Sincronizamos o estado local com o prop vindo do servidor
  const [offered, setOffered] = useState(initialTotal);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Atualiza o estado local quando os props mudam (revalidação do servidor)
  useEffect(() => {
    setOffered(initialTotal);
  }, [initialTotal]);

  const percentage = Math.min((offered / GOAL) * 100, 100);

  return (
    <>
      <section className="bg-cream py-16 md:py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Title */}
          <p className="font-sans-body text-sm tracking-[0.25em] uppercase text-gold mb-3">
            "Espero tudo do Bom Deus, como uma criancinha espera tudo de seu pai"
          </p>
          <h2 className="font-serif-display text-3xl md:text-4xl lg:text-5xl font-light text-marian-deep mb-3">
            Corrente de Oração
          </h2>
          <p className="font-sans-body text-muted-foreground text-sm md:text-base mb-10 max-w-md mx-auto leading-relaxed">
            Ofereça um Terço do Rosário e ajude a construir, com suas orações, 
            a fundação necessária para uma vida matrimonial abençoada.
          </p>

          {/* Progress circle */}
          <div className="relative w-52 h-52 mx-auto mb-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
              <circle
                cx="100" cy="100" r="88"
                fill="none"
                stroke="hsl(210, 45%, 92%)"
                strokeWidth="10"
              />
              <circle
                cx="100" cy="100" r="88"
                fill="none"
                stroke="url(#progressGradientData)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - percentage / 100)}`}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="progressGradientData" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(215, 50%, 40%)" />
                  <stop offset="50%" stopColor="hsl(210, 60%, 68%)" />
                  <stop offset="100%" stopColor="hsl(40, 60%, 55%)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-serif-display text-4xl font-semibold text-marian-deep">{offered}</span>
              <span className="font-sans-body text-xs text-muted-foreground tracking-wider">de {GOAL}</span>
              <span className="font-sans-body text-[10px] text-gold uppercase tracking-widest mt-1">Terços</span>
            </div>
          </div>

          <p className="font-sans-body text-sm text-muted-foreground mb-8">
            <span className="text-gold font-semibold">{offered}</span> de <span className="font-semibold">{GOAL}</span> Terços Oferecidos
          </p>

          {/* CTA */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-cta font-sans-body text-base md:text-lg"
          >
            Oferecer um Terço
          </button>
        </div>
      </section>

      <PrayerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default SpiritualBouquet;
