"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function TestPage() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Frontend Test Page</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-center">
            If you can see this page, the frontend is working correctly.
          </p>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={() => setCount(count - 1)}
              className="rounded-xl"
            >
              -
            </Button>
            <span className="w-12 text-center">{count}</span>
            <Button 
              className="bg-ghost-gradient text-white hover:opacity-90 rounded-xl"
              onClick={() => setCount(count + 1)}
            >
              +
            </Button>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <p className="text-ghost-gradient font-bold">Text Gradient Test</p>
            <div className="bg-ghost-gradient text-white p-2 rounded-xl">
              Background Gradient Test
            </div>
            <Button className="shadow-glow">Shadow Glow Test</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}