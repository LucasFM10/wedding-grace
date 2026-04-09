import { signIn } from "../actions";

/**
 * Página de Login - Acesso administrativo
 * Design focado em elegância e simplicidade, seguindo o tema do casamento.
 */

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-10 border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl text-gray-800 mb-2">Área Administrativa</h1>
          <p className="text-gray-400 text-sm italic">Lucas & Amanda</p>
        </div>

        {searchParams.error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-lg text-center border border-red-100">
            {searchParams.error}
          </div>
        )}

        <form action={signIn} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2 px-1">
              E-mail
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold-light/20 focus:border-gold-light outline-none transition-all"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2 px-1">
              Senha
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-gold-light/20 focus:border-gold-light outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gray-800 text-white font-semibold rounded-xl hover:bg-black transition-all active:scale-[0.98] shadow-lg shadow-gray-200"
          >
            Entrar no Painel
          </button>
        </form>

        <div className="mt-10 text-center">
          <a href="/" className="text-gray-400 hover:text-gray-600 text-sm transition-colors uppercase tracking-widest font-semibold text-[10px]">
            ← Voltar para o Site
          </a>
        </div>
      </div>
    </div>
  );
}
