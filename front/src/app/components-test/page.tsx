"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { AuroraText } from "~/components/magicui/aurora-text";

export default function ComponentsTestPage() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-background">
      <Card className="w-full max-w-md shadow-soft">
        <CardHeader>
          <CardTitle className="text-center">
            <AuroraText colors={["#5046E5", "#6366F1", "#10B981", "#34D399"]}>
              Components Test Page
            </AuroraText>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-center">
            Testing UI components and styling
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
          
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 w-full">
            <div className="bg-ghost-gradient text-white p-4 rounded-xl shadow-glow">
              Ghost Gradient
            </div>
            <div className="bg-communication-gradient text-white p-4 rounded-xl shadow-glow">
              Communication Gradient
            </div>
          </div>
          
          <div className="mt-4 w-full">
            <p className="text-ghost-gradient font-bold mb-2">Text Gradient</p>
            <p className="text-communication-gradient font-bold">Communication Gradient</p>
          </div>
          
          <div className="mt-4 w-full">
            <Link href="/">
              <Button className="w-full rounded-xl">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}