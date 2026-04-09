import { PrismaClient } from "@prisma/client";

/**
 * Padrão Singleton com Proxy para Inicialização Lazy (Preguiçosa).
 * O PrismaClient só será instanciado na PRIMEIRA vez que um método for chamado.
 * Isso evita que o build do Vercel falhe ao importar este módulo, pois a 
 * DATABASE_URL só é necessária no momento da execução da query, não na criação do objeto Proxy.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const prisma = new Proxy({} as PrismaClient, {
  get: (target, prop) => {
    // Se a instância global ainda não existe, cria agora (no momento do acesso)
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = prismaClientSingleton();
    }
    
    // Retorna a propriedade solicitada da instância real
    return (globalForPrisma.prisma as any)[prop];
  },
});

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = undefined; // Força re-instalação se necessário em dev
