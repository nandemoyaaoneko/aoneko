import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages } = await req.json()

    // Retrieve Gemini API Key from environment secrets
    const apiKey = Deno.env.get("GEMINI_API_KEY") || Deno.env.get("VITE_GEMINI_API_KEY")
    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          reply: '申し訳ございません。ただいまAIアシスタントのAPIキーが設定されていません。お手数ですが、お電話（0120-502-622）またはお問い合わせフォームより直接ご相談ください。迅速に対応させていただきます！' 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const systemPrompt = "あなたは「何でも屋 青ねこ」の公式AIアシスタントです。愛知県、三重県、岐阜県の東海三県で、お片付けサポート、不用品リユース便、単身引越し、エアコンクリーニング、プチ解体（屋外構造物の分解・お引取り）などの便利屋サービスを提供しています。常に見積もりや相談を希望するお客様に対して、丁寧な日本語（敬語）で対応してください。価格設定や対応エリア（東海エリア）について正確に案内し、最終的にはお問い合わせや予約へ誘導することを目的とします。";

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: messages.map((msg: any) => ({
            role: msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user',
            parts: [{ text: msg.content || msg.text }]
          })),
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          generationConfig: {
            maxOutputTokens: 800,
            temperature: 0.7,
          }
        }),
      }
    )

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API returned status ${response.status}: ${errText}`);
    }

    const resData = await response.json();
    const reply = resData.candidates?.[0]?.content?.parts?.[0]?.text || 
      '申し訳ございません。お返事を生成できませんでした。詳細はお電話にてお問い合わせください。';

    return new Response(
      JSON.stringify({ reply }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error: any) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        reply: 'エラーが発生しました。お手数ですが、しばらく時間をおいてから再度お試しいただくか、お電話（0120-502-622）にて直接お問い合わせください。' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
