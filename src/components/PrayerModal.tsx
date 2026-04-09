import { useState } from "react";
import { X, Minus, Plus, Heart } from "lucide-react";

interface PrayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (quantity: number) => void;
}

const PrayerModal = ({ isOpen, onClose, onSubmit }: PrayerModalProps) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [intentions, setIntentions] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    onSubmit(quantity);
    setSuccess(true);
  };

  const handleClose = () => {
    setName("");
    setQuantity(1);
    setIntentions("");
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
                Que Nossa Senhora interceda por você!
              </p>
              <p className="font-sans-body text-sm text-muted-foreground leading-relaxed">
                Seu(s) terço(s) foram registrados com carinho. Lucas e sua noiva 
                rezarão por suas intenções diariamente até o dia do Sacramento.
              </p>
              <button onClick={handleClose} className="btn-submit mt-6 font-sans-body">
                Fechar
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="font-sans-body text-sm font-medium text-foreground block mb-1.5">
                  Seu Nome <span className="text-muted-foreground font-normal">(opcional, para ofertas anônimas)</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Maria das Graças"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background font-sans-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>

              {/* Quantity stepper */}
              <div>
                <label className="font-sans-body text-sm font-medium text-foreground block mb-1.5">
                  Quantidade de Terços
                </label>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-serif-display text-3xl font-semibold text-marian-deep w-16 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Intentions */}
              <div>
                <label className="font-sans-body text-sm font-medium text-foreground block mb-1.5">
                  Suas Intenções de Oração
                </label>
                <textarea
                  value={intentions}
                  onChange={(e) => setIntentions(e.target.value)}
                  placeholder="Escreva aqui suas intenções..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background font-sans-body text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
                <p className="font-sans-body text-xs text-muted-foreground mt-1.5 italic">
                  O casal intercederá por suas intenções diariamente em suas orações.
                </p>
              </div>

              {/* Submit */}
              <button onClick={handleSubmit} className="btn-submit w-full font-sans-body text-base">
                Enviar Intenção
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrayerModal;
