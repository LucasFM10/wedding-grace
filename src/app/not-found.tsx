import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center">
        <h1 className="font-serif-display text-6xl text-gold mb-4">404</h1>
        <p className="font-sans-body text-xl text-marian-deep mb-6">Página não encontrada</p>
        <Link href="/" className="btn-submit inline-block">
          Voltar para o Início
        </Link>
      </div>
    </div>
  );
}
