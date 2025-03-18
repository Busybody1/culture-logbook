
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('https://api.beehiiv.com/v2/publications/pub_decaf087-e30b-467f-abcc-f56379e7a1ed/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer wap5M073ReXuD0XPwfFBeU2P21FWjvwVfeIyqRVY0fQ4mebsb80lkUTKvLkoS0ni',
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: 'website',
          utm_medium: 'organic',
          utm_campaign: 'footer_signup'
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Success!",
          description: "You've been subscribed to our newsletter.",
        });
        setEmail('');
      } else {
        throw new Error(data.message || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 border-t relative overflow-hidden">
      {/* Background texture */}
      <div 
        className="absolute inset-0 bg-orange-50" 
        style={{
          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBoLTQweiIvPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHptMjAgMGgyMHY0MEgyMHptMCAyMGgyMHYyMEgyMHptLTIwIDBoMjB2MjBIMHoiIHN0cm9rZT0iI0ZGOTM0NCIgc3Ryb2tlLW9wYWNpdHk9Ii4xIiBzdHJva2Utd2lkdGg9Ii41Ii8+PHBhdGggZD0iTTAgMGgyMHYyMEgwem0yMCAyMGgyMHYyMEgyMHoiIHN0cm9rZT0iI0ZGOTM0NCIgc3Ryb2tlLW9wYWNpdHk9Ii4xIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')",
          opacity: 0.6
        }}
      />
      
      {/* Cultural accent - postmark style decoration */}
      <div className="absolute top-4 right-4 opacity-20">
        <div className="w-24 h-24 rounded-full border-dashed border-2 border-text flex items-center justify-center transform rotate-12">
          <span className="text-xs font-bold text-text">SUBSCRIBE</span>
        </div>
      </div>
      
      <div className="max-w-xl mx-auto text-center relative z-10">
        <h2 className="text-3xl font-bold mb-4 text-text animate-fade-in">
          Join Our Newsletter
        </h2>
        <p className="text-text/80 mb-8 text-base font-medium animate-fade-in" style={{animationDelay: "0.2s"}}>
          Get weekly food culture insights and inspiration delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto animate-fade-in" style={{animationDelay: "0.4s"}}>
          <Input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 transition-all duration-300 focus:ring-2 focus:ring-[#27AD95]" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <Button 
            type="submit"
            className="bg-[#27AD95] text-white hover:bg-[#27AD95]/90 transition-all duration-300 hover:scale-105 transform"
            disabled={isLoading}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
