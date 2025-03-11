
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const groqApiKey = Deno.env.get('GROQ_API_KEY') || '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';

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

    console.log(`Processing ${type} request with prompt: ${prompt.substring(0, 50)}...`);

    let systemPrompt = '';
    switch (type) {
      case 'hashtags':
        systemPrompt = "You are a social media expert. Generate relevant and trending hashtags for this content. Return only the hashtags with # symbols, like '#example #another', separated by spaces. Format each hashtag with the # symbol and no spaces between words.";
        break;
      case 'caption':
        systemPrompt = "You are a social media content writer. Generate an engaging and natural-sounding caption for this content. Keep it concise and appealing. Do not include any hashtags in the caption as they will be generated separately.";
        break;
      case 'title':
        systemPrompt = "Generate a short, catchy title that captures the essence of this content. Keep it under 60 characters.";
        break;
      case 'experience':
        systemPrompt = "Transform these keywords into a diary entry from your perspective. Be direct and personal, use sensory details and emotions. No thinking notes or explanations - write only the final text in 3-5 concise sentences.";
        break;
      default:
        systemPrompt = "Generate engaging content based on the provided context.";
    }

    console.log(`Using system prompt for ${type}: ${systemPrompt.substring(0, 50)}...`);

    const payload = {
      model: "deepseek-r1-distill-qwen-32b",
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
    };

    console.log("Sending request to Groq API...");
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Groq API error: ${response.status} - ${errorText}`);
      throw new Error(`Groq API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    let generatedText = data.choices[0].message.content;
    
    // Remove any <think>...</think> tags and their content
    generatedText = generatedText.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
    
    console.log(`Successfully generated content: ${generatedText.substring(0, 50)}...`);

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
