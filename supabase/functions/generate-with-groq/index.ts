
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const groqApiKey = Deno.env.get('GROQ_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, type } = await req.json();

    let systemPrompt = '';
    switch (type) {
      case 'hashtags':
        systemPrompt = "You are a social media expert. Generate relevant and trending hashtags for this content. Return only the hashtags separated by commas, without # symbols.";
        break;
      case 'caption':
        systemPrompt = "You are a social media content writer. Generate an engaging and natural-sounding caption for this content. Keep it concise and appealing.";
        break;
      case 'title':
        systemPrompt = "Generate a short, catchy title that captures the essence of this content. Keep it under 60 characters.";
        break;
      case 'experience':
        systemPrompt = "You are a diary assistant helping users create coherent descriptions from their notes or keywords. Transform their input into a well-written, personal experience using simple language. Focus on sensory details and emotions. Keep it concise yet vivid.";
        break;
      default:
        systemPrompt = "Generate engaging content based on the provided context.";
    }

    const response = await fetch('https://api.groq.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "deepseek-r1-distill-qwen-32b",
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    return new Response(JSON.stringify({ generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-with-groq function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
