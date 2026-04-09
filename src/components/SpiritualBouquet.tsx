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
      <section className="bg-cream py-16 md:py-24 px-6 relative overflow-hidden">
        {/* Subtle background glow behind the counter */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] -z-10" />

        <div className="max-w-2xl mx-auto text-center">

          {/* Epígrafe */}
          <p className="font-sans-body text-sm tracking-[0.25em] uppercase text-gold mb-1">
            &ldquo;Espero tudo do Bom Deus, como uma criancinha espera tudo de seu pai&rdquo;
          </p>
          <p className="font-sans-body text-[11px] text-muted-foreground tracking-wider uppercase mb-8">
            — Santa Teresinha do Menino Jesus
          </p>

          {/* Título */}
          <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-light text-marian-deep mb-4">
            Corrente de Oração
          </h2>
          <p className="font-sans-body text-muted-foreground text-sm md:text-base max-w-md mx-auto leading-relaxed mb-12">
            Ofereça um Terço pelo nosso noivado e nos ajude a construir
            a fundação necessária para uma vida matrimonial santa.
          </p>

          {/* Progress circle — NOW PROMINENT AND CENTRAL */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-10 group animate-pulse-slow">
            {/* Background halo glow */}
            <div className="absolute inset-0 bg-gold/10 rounded-full blur-[60px] group-hover:bg-gold/20 transition-all duration-700" />
            
            <svg className="w-full h-full -rotate-90 relative z-10 drop-shadow-[0_0_15px_hsla(var(--gold),0.2)]" viewBox="0 0 200 200">
              {/* Background circle */}
              <circle
                cx="100" cy="100" r="90"
                fill="none"
                stroke="hsl(var(--secondary))"
                strokeWidth="6"
              />
              {/* Progress circle with premium stroke and glow */}
              <circle
                cx="100" cy="100" r="90"
                fill="none"
                stroke="url(#progressGradientData)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 90}`}
                strokeDashoffset={`${2 * Math.PI * 90 * (1 - percentage / 100)}`}
                className="transition-all duration-[1500ms] ease-in-out"
                style={{ filter: "drop-shadow(0 0 12px hsla(var(--gold), 0.4))" }}
              />
              <defs>
                <linearGradient id="progressGradientData" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(215, 60%, 30%)" />
                  <stop offset="50%" stopColor="hsl(210, 70%, 65%)" />
                  <stop offset="100%" stopColor="hsl(40, 70%, 50%)" />
                </linearGradient>
              </defs>
            </svg>

            {/* Content inside the circle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
              <span className="font-serif-display text-7xl md:text-8xl font-bold text-marian-deep tracking-tighter drop-shadow-sm">
                {offered}
              </span>
              <div className="flex flex-col items-center -mt-2">
                <div className="h-[1px] w-12 bg-gold/30 mb-2" />
                <span className="font-sans-body text-xs md:text-sm text-muted-foreground uppercase tracking-[0.3em]">de {GOAL}</span>
                <span className="font-serif-display text-xl md:text-2xl text-gold italic mt-2 font-medium">Terços Oferecidos</span>
              </div>
            </div>
          </div>

          <p className="font-sans-body text-xs md:text-sm text-gold/60 uppercase tracking-[0.3em] mb-10">
            Estamos a <span className="text-gold font-bold">{(GOAL - offered).toLocaleString()}</span> terços da nossa meta
          </p>

          {/* CTA */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-cta font-sans-body text-base md:text-lg mb-16 scale-110"
          >
            Oferecer um Terço
          </button>

          {/* Divider with Icon */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="gold-divider w-16 md:w-32" />
            <span className="text-gold text-xl">❦</span>
            <div className="gold-divider w-16 md:w-32" />
          </div>

          {/* Por que 1830 Terços — agora como background e detalhamento */}
          <div className="max-w-xl mx-auto">
            <h3 className="font-serif-display text-2xl md:text-3xl font-light text-marian-deep mb-6">
              A História dos 1830 Terços
            </h3>
            <div className="space-y-6 text-left border-l-2 border-gold/20 pl-6 md:pl-8 italic">
              <p className="font-sans-body text-muted-foreground text-sm md:text-base leading-relaxed">
                Em <span className="font-semibold text-foreground">1830</span>, na Capela da Rue du Bac, em Paris,
                a Santíssima Virgem Maria apareceu a{" "}
                <span className="font-semibold text-foreground">Santa Catarina Labouré</span>. 
                Nessa aparição, revelou a <span className="font-semibold text-foreground">Medalha Milagrosa</span>,
                com a promessa de graças abundantes aos que a portarem com confiança.
              </p>
              <p className="font-sans-body text-muted-foreground text-sm md:text-base leading-relaxed">
                Ao longo do nosso relacionamento, pequenos sinais marianos nos guiaram. 
                Em gratidão, decidimos rezar <span className="font-semibold text-foreground">1830 terços</span> 
                — número que evoca aquele ano — como alicerce espiritual para nossa nova família.
              </p>
            </div>
          </div>

          {/* Pedido — Jaculatória final */}
          <div className="mt-16 pt-8 border-t border-gold/10">
            <p className="font-serif-display text-lg italic font-light text-marian-deep max-w-md mx-auto leading-relaxed mb-3">
              Se possível, ao final de cada mistério, reze conosco:
            </p>
            <p className="font-serif-display text-xl md:text-2xl text-gold italic max-w-lg mx-auto leading-relaxed drop-shadow-sm">
              &ldquo;Ó Maria concebida sem pecado, rogai por nós que recorremos a Vós&rdquo;
            </p>
          </div>
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
