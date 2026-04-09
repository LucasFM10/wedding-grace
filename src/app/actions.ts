"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Registra a oferta de um terço no banco de dados.
 */
export async function registerOffering(data: {
  nomeDevoto?: string;
  quantidade: number;
  intencao?: string;
}) {
  try {
    const offering = await prisma.tercoOferecido.create({
      data: {
        nomeDevoto: data.nomeDevoto || null,
        quantidade: data.quantidade,
        intencao: data.intencao || null,
      },
    });

    // Revalida a página principal para atualizar o contador
    revalidatePath("/");
    
    return { success: true, data: offering };
  } catch (error) {
    console.error("Erro ao registrar oferta:", error);
    return { success: false, error: "Falha ao registrar a oferta." };
  }
}

/**
 * Retorna a soma total de terços oferecidos.
 */
export async function getTotalOfferings() {
  try {
    const aggregation = await prisma.tercoOferecido.aggregate({
      _sum: {
        quantidade: true,
      },
    });

    return aggregation._sum.quantidade || 0;
  } catch (error) {
    console.error("Erro ao buscar total:", error);
    return 0;
  }
}
