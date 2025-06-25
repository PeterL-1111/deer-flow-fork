// Copyright (c) 2025 Peter Liu
// SPDX-License-Identifier: MIT

import { useState } from "react";
import { Check, Zap, Shield, Rocket, Heart } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { setReportStyle, useSettingsStore } from "~/core/store";
import { cn } from "~/lib/utils";

import { Tooltip } from "./tooltip";

const REPORT_STYLES = [
  {
    value: "aggressive" as const,
    label: "Aggressive",
    description: "Bold, direct, and confident - cuts straight to the point",
    icon: Zap,
    color: "from-amber-500 to-red-500",
  },
  {
    value: "conservative" as const,
    label: "Conservative",
    description: "Careful, measured, and diplomatic - builds trust gradually",
    icon: Shield,
    color: "from-blue-500 to-indigo-600",
  },
  {
    value: "go_nuts" as const,
    label: "Go Nuts",
    description: "Creative, energetic, and wildly memorable - breaks all rules",
    icon: Rocket,
    color: "from-purple-500 to-pink-500",
  },
  {
    value: "friendly" as const,
    label: "Friendly",
    description: "Warm, approachable, and empathetic - builds genuine connections",
    icon: Heart,
    color: "from-green-400 to-teal-500",
  },
];

export function ReportStyleDialog() {
  const [open, setOpen] = useState(false);
  const currentStyle = useSettingsStore((state) => state.general.reportStyle);

  const handleStyleChange = (
    style: "aggressive" | "conservative" | "go_nuts" | "friendly",
  ) => {
    setReportStyle(style);
    setOpen(false);
  };

  const currentStyleConfig =
    REPORT_STYLES.find((style) => style.value === currentStyle) ||
    REPORT_STYLES[0]!;
  const CurrentIcon = currentStyleConfig.icon;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip
        className="max-w-60"
        title={
          <div>
            <h3 className="mb-2 font-bold">
              Writing Style: {currentStyleConfig.label}
            </h3>
            <p>
              Choose the writing style for your outreach messages. Different
              styles are optimized for different audiences and purposes.
            </p>
          </div>
        }
      >
        <DialogTrigger asChild>
          <Button
            className={cn(
              "rounded-xl",
              "!border-brand !text-brand bg-brand/5",
            )}
            variant="outline"
          >
            <CurrentIcon className="h-4 w-4" /> {currentStyleConfig.label}
          </Button>
        </DialogTrigger>
      </Tooltip>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Choose Writing Style</DialogTitle>
          <DialogDescription>
            Select the writing style for your outreach messages. Each style is
            optimized for different audiences and purposes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          {REPORT_STYLES.map((style) => {
            const Icon = style.icon;
            const isSelected = currentStyle === style.value;

            return (
              <button
                key={style.value}
                className={cn(
                  "hover:bg-accent flex items-start gap-3 rounded-lg border p-4 text-left transition-all",
                  isSelected && "border-primary bg-primary/5 shadow-sm",
                )}
                onClick={() => handleStyleChange(style.value)}
              >
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br",
                  style.color,
                  "text-white"
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{style.label}</h4>
                    {isSelected && <Check className="text-primary h-4 w-4" />}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {style.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}