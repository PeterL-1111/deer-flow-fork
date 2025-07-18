// Copyright (c) 2025 Peter Liu
// SPDX-License-Identifier: MIT

import { zodResolver } from "@hookform/resolvers/zod";
import { Settings } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Textarea } from "~/components/ui/textarea";
import type { SettingsState } from "~/core/store";

import type { Tab } from "./types";

// Simplified schema to avoid deep type instantiation
const generalFormSchema = z.object({
  autoAcceptedPlan: z.boolean(),
  maxPlanIterations: z.number().min(1, "Max plan iterations must be at least 1."),
  maxStepNum: z.number().min(1, "Max step number must be at least 1."),
  maxSearchResults: z.number().min(1, "Max search results must be at least 1."),
  enableBackgroundInvestigation: z.boolean(),
  enableDeepThinking: z.boolean(),
  reportStyle: z.enum(["aggressive", "conservative", "go_nuts", "friendly"]),
  userBackground: z.string(),
});

// Explicit type definition to avoid inference issues
interface GeneralFormData {
  autoAcceptedPlan: boolean;
  maxPlanIterations: number;
  maxStepNum: number;
  maxSearchResults: number;
  enableBackgroundInvestigation: boolean;
  enableDeepThinking: boolean;
  reportStyle: "aggressive" | "conservative" | "go_nuts" | "friendly";
  userBackground: string;
}

export const GeneralTab: Tab = ({
  settings,
  onChange,
}: {
  settings: SettingsState;
  onChange: (changes: Partial<SettingsState>) => void;
}) => {
  const generalSettings = useMemo(() => settings.general, [settings]);
  
  const form = useForm<GeneralFormData>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: generalSettings,
    mode: "all",
    reValidateMode: "onBlur",
  });

  const currentSettings = form.watch();
  
  useEffect(() => {
    // Simple deep equality check for settings changes
    const hasChanges = JSON.stringify(currentSettings) !== JSON.stringify(settings.general);
    if (hasChanges) {
      // Create the update with explicit typing
      const generalUpdate: SettingsState["general"] = {
        autoAcceptedPlan: currentSettings.autoAcceptedPlan,
        enableDeepThinking: currentSettings.enableDeepThinking,
        enableBackgroundInvestigation: currentSettings.enableBackgroundInvestigation,
        maxPlanIterations: currentSettings.maxPlanIterations,
        maxStepNum: currentSettings.maxStepNum,
        maxSearchResults: currentSettings.maxSearchResults,
        reportStyle: currentSettings.reportStyle,
        userBackground: currentSettings.userBackground,
      };
      onChange({ general: generalUpdate });
    }
  }, [currentSettings, onChange, settings.general]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="flex flex-col gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.header variants={item}>
        <h1 className="text-xl font-semibold text-foreground">General Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Configure how Unghost Agent works for you</p>
      </motion.header>
      <Form {...form}>
        <form className="space-y-8">
          <motion.div 
            variants={item}
            className="p-6 rounded-xl border bg-card/50 backdrop-blur-sm shadow-soft"
          >
            <h2 className="text-lg font-medium mb-4 text-primary">Your Profile</h2>
            <FormField
              control={form.control}
              name="userBackground"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Professional Background</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a brief description of your professional background, role, and goals. This will help Unghost Agent tailor outreach messages to your unique voice and objectives."
                      {...field}
                      className="min-h-[120px] resize-y"
                    />
                  </FormControl>
                  <FormDescription>
                    This information will be used to personalize your outreach messages and make them more authentic to your professional voice.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div 
            variants={item}
            className="p-6 rounded-xl border bg-card/50 backdrop-blur-sm shadow-soft"
          >
            <h2 className="text-lg font-medium mb-4 text-primary">Workflow Settings</h2>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="autoAcceptedPlan"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Auto-Accept Plans</FormLabel>
                      <FormDescription>
                        Automatically accept research plans without manual review
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="enableDeepThinking"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Deep Thinking Mode</FormLabel>
                      <FormDescription>
                        Enable more thorough reasoning for complex tasks
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="enableBackgroundInvestigation"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Background Investigation</FormLabel>
                      <FormDescription>
                        Perform web searches before planning to enhance context
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </motion.div>

          <motion.div 
            variants={item}
            className="p-6 rounded-xl border bg-card/50 backdrop-blur-sm shadow-soft"
          >
            <h2 className="text-lg font-medium mb-4 text-primary">Advanced Settings</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="maxPlanIterations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max plan iterations</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        type="number"
                        defaultValue={field.value}
                        min={1}
                        onChange={(event) =>
                          field.onChange(parseInt(event.target.value || "0"))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Set to 1 for single-step planning. Set to 2 or more to
                      enable re-planning.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="maxStepNum"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max steps of a research plan</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        type="number"
                        defaultValue={field.value}
                        min={1}
                        onChange={(event) =>
                          field.onChange(parseInt(event.target.value || "0"))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      By default, each research plan has 3 steps.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="maxSearchResults"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max search results</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        type="number"
                        defaultValue={field.value}
                        min={1}
                        onChange={(event) =>
                          field.onChange(parseInt(event.target.value || "0"))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      By default, each search step has 3 results.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="reportStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Report Style</FormLabel>
                    <FormControl>
                      <select
                        className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value as any)}
                      >
                        <option value="aggressive">Aggressive</option>
                        <option value="conservative">Conservative</option>
                        <option value="go_nuts">Go Nuts</option>
                        <option value="friendly">Friendly</option>
                      </select>
                    </FormControl>
                    <FormDescription>
                      Choose your preferred writing style for outreach messages.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
};

GeneralTab.displayName = "General";
GeneralTab.icon = Settings;