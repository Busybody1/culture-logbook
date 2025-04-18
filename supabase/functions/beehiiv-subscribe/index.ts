
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// Set CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the email from the request body
    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    const apiKey = Deno.env.get("BEEHIIV_API_KEY");
    if (!apiKey) {
      console.error("BEEHIIV_API_KEY is not set in environment variables");
      return new Response(
        JSON.stringify({ error: "API key configuration error" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    console.log("Making request to Beehiiv API with email:", email);
    
    // Make the request to the Beehiiv API - using the publication ID from your example
    // Note: replaced the test pub ID with the one from your curl example
    const response = await fetch(
      "https://api.beehiiv.com/v2/publications/pub_decaf087-e30b-467f-abcc-f56379e7a1ed/subscriptions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: "fooddiary",
          utm_medium: "api"
        }),
      }
    );

    const data = await response.json();
    console.log("Beehiiv API response:", JSON.stringify(data));

    // Return the response from the Beehiiv API
    return new Response(
      JSON.stringify(data),
      { 
        status: response.status, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error in beehiiv-subscribe function:", error.message);
    
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
