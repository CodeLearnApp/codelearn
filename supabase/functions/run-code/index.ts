
// supabase/functions/run-code/index.ts
// Proxy hacia Judge0 CE (RapidAPI). La key JUDGE0_API_KEY vive como secret
// de Supabase, nunca en el bundle del navegador.
// Requiere que el usuario esté logueado (valida el JWT de Supabase).

import * as jose from "https://deno.land/x/jose@v4.14.4/index.ts";

const JUDGE0_API_KEY = Deno.env.get("JUDGE0_API_KEY");
const SUPABASE_JWT_SECRET = Deno.env.get("SUPABASE_JWT_SECRET");

// TODO: en producción, reemplazá "*" por tu dominio real, ej:
// "Access-Control-Allow-Origin": "https://codelearn.codes"
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Verificar que quien llama es un usuario logueado de Supabase
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verificar el JWT token
    const secret = new TextEncoder().encode(SUPABASE_JWT_SECRET!);
    try {
      await jose.jwtVerify(token, secret);
    } catch (error) {
      return new Response(JSON.stringify({ error: "Token inválido", details: error.message }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Leer el código y el lenguaje que mandó el cliente
    const { language_id, source_code } = await req.json();
    if (!language_id || !source_code) {
      return new Response(JSON.stringify({ error: "Faltan datos" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 3. Llamar a Judge0 con la key guardada en el server
    const judgeRes = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true&fields=stdout,stderr,compile_output,status",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": JUDGE0_API_KEY!,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        body: JSON.stringify({ language_id, source_code }),
      }
    );

    const data = await judgeRes.json();
    return new Response(JSON.stringify(data), {
      status: judgeRes.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});