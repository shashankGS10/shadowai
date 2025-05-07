import React from 'react'

import { Button } from '@/shadowai/components/ui/button';

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background transition-colors duration-300">
      <h1 className="text-3xl font-bold text-foreground mb-4">Root Page</h1>
      <Button variant="default" className="px-4 py-2">
        Test Button
      </Button>
    </div>
  );
};

export default Page;