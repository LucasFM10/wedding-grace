import { useState, useEffect } from "react";
import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import couple3 from "@/assets/couple-3.jpg";

const images = [couple1, couple2, couple3];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Lucas e sua noiva - foto ${i + 1}`}
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out"
          style={{ opacity: current === i ? 1 : 0 }}
          {...(i === 0 ? {} : { loading: "lazy" as const })}
        />
      ))}

      {/* Overlay */}
      <div className="hero-overlay absolute inset-0 z-10" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
        <p className="font-sans-body text-sm tracking-[0.3em] uppercase text-gold-light animate-float-up mb-4">
          Celebração do Sacramento do Matrimônio
        </p>

        <h1 className="font-serif-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-wide mb-2 animate-float-up" style={{ color: 'hsl(40, 60%, 90%)' }}>
          Lucas <span className="text-gold-light font-light">&</span> Noiva
        </h1>

        <div className="gold-divider w-32 md:w-48 my-6 animate-float-up-delay" />

        <p className="font-sans-body text-base md:text-lg tracking-widest uppercase animate-float-up-delay" style={{ color: 'hsl(210, 30%, 85%)' }}>
          15 de Novembro de 2025 · João Pessoa — PB
        </p>

        <div className="mt-8 animate-float-up-delay-2">
          <p className="font-serif-display text-xl md:text-2xl italic font-light" style={{ color: 'hsl(40, 60%, 85%)' }}>
            "Fazei tudo o que Ele vos disser"
          </p>
          <p className="font-sans-body text-xs tracking-widest mt-2" style={{ color: 'hsl(210, 30%, 70%)' }}>
            — Jo 2,5
          </p>
        </div>
      </div>

      {/* Carousel indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="w-2 h-2 rounded-full transition-all duration-500"
            style={{
              backgroundColor: current === i ? 'hsl(40, 60%, 55%)' : 'hsla(0, 0%, 100%, 0.4)',
              width: current === i ? '24px' : '8px',
            }}
            aria-label={`Ver foto ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
