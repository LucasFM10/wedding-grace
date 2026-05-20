"use client";

import { useState, useRef, ChangeEvent } from "react";
import { X, Minus, Plus, Heart, Loader2, Camera, Trash2 } from "lucide-react";
import { registerOffering } from "@/app/actions";

interface PrayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrayerModal = ({ isOpen, onClose }: PrayerModalProps) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [intentions, setIntentions] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("A foto deve ser menor que 5MB");
        return;
      }
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    setIsPending(true);
    
    // Usamos FormData para suportar o envio de arquivos
    const formData = new FormData();
    formData.append("nomeDevoto", name);
    formData.append("quantidade", quantity.toString());
    formData.append("intencao", intentions);
    if (photo) {
      formData.append("foto", photo);
    }

    const result = await registerOffering(formData);

    setIsPending(false);

    if (result.success) {
      setSuccess(true);
    } else {
      alert("Houve um erro ao registrar sua oferta. Por favor, tente novamente.");
    }
  };

  const handleClose = () => {
    setName("");
    setQuantity(1);
    setIntentions("");
    setPhoto(null);
    setPhotoPreview(null);
    setSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleClose}>
      <div
        className="bg-card rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-float-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-0">
          <h3 className="font-serif-display text-2xl font-semibold text-marian-deep">
            {success ? "Obrigado!" : "Oferecer Terço"}
          </h3>
          <button onClick={handleClose} className="text-muted-foreground hover:text-foreground transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="gold-divider mx-5 mt-3" />

        <div className="p-5">
          {success ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-gold" />
              </div>
              <p className="font-serif-display text-xl text-marian-deep mb-2">
                "Um amigo fiel é uma poderosa proteção: quem o achou, descobriu um tesouro."
              </p>
              <p className="font-sans-body text-xs text-gold uppercase tracking-[0.2em] mb-4">
                — Eclesiástico 6,14
              </p>
              <p className="font-sans-body text-sm text-muted-foreground leading-relaxed">
                Seu(s) terço(s) foram registrados com carinho. Lucas e Amanda 
                rezarão por suas intenções diariamente até a chegada do grande dia.
              </p>
              <button 
                onClick={handleClose} 
                className="btn-submit mt-6 font-sans-body"
              >
                Fechar
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="font-sans-body text-sm font-medium text-marian-deep/90 block mb-1.5">
                  Seu Nome
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Maria das Graças"
                  disabled={isPending}
                  className="w-full px-4 py-3 rounded-lg border border-border/80 bg-background/30 font-sans-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all duration-300 disabled:opacity-50 placeholder:text-muted-foreground/60"
                />
              </div>

              {/* Quantity stepper */}
              <div>
                <label className="font-sans-body text-sm font-medium text-marian-deep/90 block mb-2 text-center">
                  Quantidade de Terços
                </label>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={isPending}
                    className="w-10 h-10 rounded-full border border-border/80 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300 disabled:opacity-50 bg-background/10 hover:bg-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-serif-display text-3xl font-semibold text-marian-deep w-16 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    disabled={isPending}
                    className="w-10 h-10 rounded-full border border-border/80 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300 disabled:opacity-50 bg-background/10 hover:bg-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Intentions */}
              <div>
                <label className="font-sans-body text-sm font-medium text-marian-deep/90 block mb-1">
                  Suas Intenções de Oração
                </label>
                <p className="font-sans-body text-xs text-muted-foreground mb-2 leading-relaxed">
                  Caso você queira, aqui você pode inserir intenções pelas quais você deseja que eu e Amanda rezemos. Por exemplo, pela saúde de um ente querido seu ou pela sua família.
                </p>
                <textarea
                  value={intentions}
                  onChange={(e) => setIntentions(e.target.value)}
                  placeholder="Escreva aqui suas intenções..."
                  rows={3}
                  disabled={isPending}
                  className="w-full px-4 py-3 rounded-lg border border-border/80 bg-background/30 font-sans-body text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all duration-300 disabled:opacity-50 placeholder:text-muted-foreground/60"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="font-sans-body text-sm font-medium text-marian-deep/90 block mb-1.5">
                  Anexar Foto
                </label>
                
                {!photoPreview ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isPending}
                    className="w-full flex flex-col items-center justify-center gap-2 py-6 border-2 border-dashed border-border/80 rounded-lg hover:border-gold hover:bg-gold/5 transition-all text-muted-foreground disabled:opacity-50 bg-background/10 hover:bg-white"
                  >
                    <Camera className="w-6 h-6 text-muted-foreground/80" />
                    <span className="text-[10px] uppercase tracking-widest font-semibold">Adicionar Foto</span>
                  </button>
                ) : (
                  <div className="relative rounded-lg overflow-hidden border border-border/80 group shadow-sm">
                    <img 
                      src={photoPreview} 
                      alt="Preview" 
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="bg-white text-red-500 p-2 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-transform"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                  accept="image/*"
                  className="hidden"
                />
                <p className="text-[10px] text-muted-foreground/80 mt-2 italic text-center uppercase tracking-widest">
                  Compartilhe um momento especial conosco.
                </p>
              </div>

              {/* Submit */}
              <button 
                onClick={handleSubmit} 
                disabled={isPending}
                className="btn-submit w-full font-sans-body text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300"
              >
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                {isPending ? "Registrando..." : "Enviar Terço"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrayerModal;
