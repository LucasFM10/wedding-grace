import { PrismaClient } from "@prisma/client";

/**
 * Padrão Singleton para o PrismaClient.
 * Em Prisma 7, a inicialização automática falha se a DATABASE_URL estiver vazia.
 * Durante o build do Vercel, a URL muitas vezes não está presente, o que causa o crash.
 */

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// Se estivermos em tempo de build (onde o banco geralmente não é necessário), 
// podemos atrasar ou proteger a inicialização.
const getPrisma = () => {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  // Tenta instanciar. Se falhar por falta de URL em tempo de build, 
  // o erro será capturado onde a função for chamada.
  const client = prismaClientSingleton();
  
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
  }
  
  return client;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
