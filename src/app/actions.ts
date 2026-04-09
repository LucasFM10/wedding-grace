"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

/**
 * Persistência Real com Supabase para o ElevadorParaDois.
 * Agora os dados são salvos permanentemente no banco centralizado.
 */

export async function registerOffering(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const nomeDevoto = formData.get("nomeDevoto") as string;
  const quantidade = parseInt(formData.get("quantidade") as string) || 1;
  const intencao = formData.get("intencao") as string;
  const file = formData.get("foto") as File | null;

  try {
    let foto_url = null;

    // Lógica de Upload de Foto
    if (file && file.size > 0) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).slice(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload para o bucket 'fotos-tercos'
      const { error: uploadError } = await supabase.storage
        .from('fotos-tercos')
        .upload(filePath, file);

      if (uploadError) {
        console.error("Erro no upload do Storage:", uploadError);
      } else {
        // Pega a URL pública
        const { data: { publicUrl } } = supabase.storage
          .from('fotos-tercos')
          .getPublicUrl(filePath);
          
        foto_url = publicUrl;
      }
    }

    const { error } = await supabase.from("tercos").insert([
      {
        nome_devoto: nomeDevoto || "Anônimo",
        quantidade: quantidade,
        intencao: intencao || "",
        foto_url: foto_url,
      },
    ]);

    if (error) throw error;

    console.log("Supabase: Oferta registrada com sucesso com foto!", { nomeDevoto, foto_url });
    
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
