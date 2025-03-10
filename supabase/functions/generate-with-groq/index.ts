
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
        systemPrompt = "You are a social media expert. Generate relevant and trending hashtags for this content. Return only the hashtags separated by commas, without # symbols.";
        break;
      case 'caption':
        systemPrompt = "You are a social media content writer. Generate an engaging and natural-sounding caption for this content. Keep it concise and appealing.";
        break;
      case 'title':
        systemPrompt = "Generate a short, catchy title that captures the essence of this content. Keep it under 60 characters.";
        break;
      case 'experience':
        systemPrompt = "Transform these notes/keywords into a personal diary entry. Write in first-person, using sensory details and emotions. Max 5 sentences. Be direct - no introductions or thinking notes, just the final text.";
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
    const generatedText = data.choices[0].message.content;

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
