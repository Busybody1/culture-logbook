
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
      const response = await fetch('https://api.beehiiv.com/v2/publications/{PUBLICATION_ID}/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_BEEHIIV_API_KEY || 'YOUR_BEEHIIV_API_KEY'}`,
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
    <section className="py-20 px-6 border-t bg-orange-50">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-text">
          Join Our Newsletter
        </h2>
        <p className="text-text/80 mb-8 text-base font-medium">
          Get weekly food culture insights and inspiration delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <Button 
            type="submit"
            className="bg-[#27AD95] text-white hover:bg-[#27AD95]/90"
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
