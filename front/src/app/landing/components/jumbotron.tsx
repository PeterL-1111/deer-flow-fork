// Copyright (c) 2025 Peter Liu
// SPDX-License-Identifier: MIT

import { GithubFilled } from "@ant-design/icons";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { AuroraText } from "~/components/magicui/aurora-text";
import { FlickeringGrid } from "~/components/magicui/flickering-grid";
import { Button } from "~/components/ui/button";
import { env } from "~/env";

export function Jumbotron() {
  return (
    <section className="flex h-[95vh] w-full flex-col items-center justify-center pb-15">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-indigo-50/50 via-white to-white dark:from-indigo-950/20 dark:via-background dark:to-background"></div>
      <FlickeringGrid
        id="ghost-hero-bg"
        className={`absolute inset-0 z-0 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]`}
        squareSize={4}
        gridGap={4}
        color="#10B981"
        maxOpacity={0.133}
        flickerChance={0.1}
      />
      <FlickeringGrid
        id="ghost-hero"
        className="absolute inset-0 z-0 translate-y-[2vh] mask-[url(/images/unghost-agent-logo.svg)] mask-size-[100vw] mask-center mask-no-repeat md:mask-size-[72vh]"
        squareSize={3}
        gridGap={6}
        color="#4F46E5"
        maxOpacity={0.64}
        flickerChance={0.12}
      />
      <div className="relative z-10 flex flex-col items-center justify-center gap-12">
        <h1 className="text-center text-4xl font-bold md:text-6xl">
          <span className="text-ghost-gradient">
            Craft Personalized Cold Outreach{" "}
          </span>
          <AuroraText>That Gets Replies</AuroraText>
        </h1>
        <p className="max-w-4xl p-2 text-center text-sm opacity-85 md:text-2xl">
          Meet Unghost Agent, your AI-powered cold outreach assistant. Transform 
          strangers into prospects with deeply personalized messages that break 
          through inbox noise and drive meaningful conversations.
        </p>
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          <Button className="bg-ghost-gradient hover:opacity-90 text-lg text-white shadow-lg md:w-48 rounded-xl" size="lg" asChild>
            <Link
              target={
                env.NEXT_PUBLIC_STATIC_WEBSITE_ONLY ? "_blank" : undefined
              }
              href={
                env.NEXT_PUBLIC_STATIC_WEBSITE_ONLY
                  ? "https://github.com/PeterL-1111/deer-flow-fork"
                  : "/chat"
              }
            >
              Start Crafting Outreach <ChevronRight />
            </Link>
          </Button>
          {!env.NEXT_PUBLIC_STATIC_WEBSITE_ONLY && (
            <Button
              className="border-ghost-blue text-ghost-blue hover:bg-ghost-blue hover:text-white text-lg md:w-42 rounded-xl"
              size="lg"
              variant="outline"
              asChild
            >
              <Link
                href="https://github.com/PeterL-1111/deer-flow-fork"
                target="_blank"
              >
                <GithubFilled />
                Learn More
              </Link>
            </Button>
          )}
        </div>
      </div>
      <div className="absolute bottom-8 flex text-xs opacity-50">
        <p>* AI-powered personalized outreach that turns cold prospects into warm conversations.</p>
      </div>
    </section>
  );
}