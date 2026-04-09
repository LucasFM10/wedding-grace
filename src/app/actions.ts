"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

/**
 * Persistência Real com Supabase para o ElevadorParaDois.
 * Agora os dados são salvos permanentemente no banco centralizado.
 */

export async function registerOffering(formData: {
  nomeDevoto?: string;
  quantidade: number;
  intencao?: string;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { error } = await supabase.from("tercos").insert([
      {
        nome_devoto: formData.nomeDevoto || "Anônimo",
        quantidade: formData.quantidade,
        intencao: formData.intencao || "",
      },
    ]);

    if (error) throw error;

    console.log("Supabase: Oferta registrada com sucesso!", formData);
    
    // Revalida a página para atualizar o contador
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Erro ao registrar no Supabase:", error);
    return { success: false, error: "Falha ao registrar intenção no banco." };
  }
}

export async function getTotalOfferings() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    // Calculamos a soma de todos os terços oferecidos
    // Nota: Como o Supabase não tem uma função sum() direta via JS Client no select padrão
    // sem RPC, vamos buscar as quantidades e somar. 
    // Para performance em escala maior, usaríamos uma RPC function 'get_total_tercos'.
    const { data, error } = await supabase
      .from("tercos")
      .select("quantidade");

    if (error) throw error;

    // Soma as quantidades (começando com 450 como base "histórica" mockada antes)
    const baseCount = 0;
    const dbTotal = data.reduce((acc, curr) => acc + (curr.quantidade || 0), 0);

    return baseCount + dbTotal;
  } catch (error) {
    console.error("Erro ao buscar total no Supabase:", error);
    return 450; // Fallback para o valor base se o banco der erro
  }
}

// --- AÇÕES DE AUTENTICAÇÃO ---

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/login?error=Credenciais inválidas");
  }

  revalidatePath("/admin", "layout");
  redirect("/admin");
}

export async function signOut() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  await supabase.auth.signOut();
  redirect("/login");
}

// --- AÇÕES ADMINISTRATIVAS ---

export async function getAllOfferings() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("tercos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao listar intenções:", error);
    return [];
  }

  return data;
}

export async function toggleSeenStatus(id: string, currentStatus: boolean) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase
    .from("tercos")
    .update({ vista: !currentStatus })
    .eq("id", id);

  if (error) {
    console.error("Erro ao atualizar status:", error);
    return { success: false };
  }

  revalidatePath("/admin");
  return { success: true };
}
