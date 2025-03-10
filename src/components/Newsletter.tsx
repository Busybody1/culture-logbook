import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
const Newsletter = () => {
  return <section className="py-20 px-6 border-t bg-orange-50">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-text">
          Join Our Newsletter
        </h2>
        <p className="text-text/80 mb-8 text-base font-medium">
          Get weekly food culture insights and inspiration delivered to your inbox.
        </p>
        <form className="flex gap-4 max-w-md mx-auto">
          <Input type="email" placeholder="Enter your email" className="flex-1" />
          <Button className="bg-[#27AD95] text-white hover:bg-[#27AD95]/90">
            Subscribe
          </Button>
        </form>
      </div>
    </section>;
};
export default Newsletter;