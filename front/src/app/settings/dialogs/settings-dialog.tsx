// Copyright (c) 2025 Peter Liu
// SPDX-License-Identifier: MIT

import { Settings } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Tabs, TabsContent } from "~/components/ui/tabs";
import { Tooltip } from "~/components/unghost-agent/tooltip";
import { useReplay } from "~/core/replay";
import {
  type SettingsState,
  changeSettings,
  saveSettings,
  useSettingsStore,
} from "~/core/store";
import { cn } from "~/lib/utils";

import { SETTINGS_TABS } from "../tabs";

export function SettingsDialog() {
  const { isReplay } = useReplay();
  const [activeTabId, setActiveTabId] = useState(SETTINGS_TABS[0]!.id);
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(useSettingsStore.getState());
  const [changes, setChanges] = useState<Partial<SettingsState>>({});

  const handleTabChange = useCallback(
    (newChanges: Partial<SettingsState>) => {
      setTimeout(() => {
        if (open) {
          setChanges((prev) => ({
            ...prev,
            ...newChanges,
          }));
        }
      }, 0);
    },
    [open],
  );

  const handleSave = useCallback(() => {
    if (Object.keys(changes).length > 0) {
      const newSettings: SettingsState = {
        ...settings,
        ...changes,
      };
      setSettings(newSettings);
      setChanges({});
      changeSettings(newSettings);
      saveSettings();
    }
    setOpen(false);
  }, [settings, changes]);

  const handleOpen = useCallback(() => {
    setSettings(useSettingsStore.getState());
  }, []);

  const handleClose = useCallback(() => {
    setChanges({});
  }, []);

  useEffect(() => {
    if (open) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [open, handleOpen, handleClose]);

  const mergedSettings = useMemo<SettingsState>(() => {
    return {
      ...settings,
      ...changes,
    };
  }, [settings, changes]);

  if (isReplay) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip title="Settings">
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings />
          </Button>
        </DialogTrigger>
      </Tooltip>
      <DialogContent className="sm:max-w-[850px] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-2xl">Unghost Agent Settings</DialogTitle>
          <DialogDescription className="text-muted-foreground/80">
            Manage your Unghost Agent settings here.
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTabId}>
          <div className="flex h-[550px] w-full overflow-hidden rounded-xl border bg-card/50 backdrop-blur-sm">
            <ul className="flex w-56 shrink-0 flex-col space-y-1 border-r bg-muted/30 p-3">
              {SETTINGS_TABS.map((tab) => (
                <motion.li
                  key={tab.id}
                  className={cn(
                    "hover:bg-accent hover:text-accent-foreground flex h-11 w-full cursor-pointer items-center gap-3 rounded-lg px-4 transition-colors",
                    activeTabId === tab.id &&
                      "bg-primary text-primary-foreground shadow-sm",
                  )}
                  onClick={() => setActiveTabId(tab.id)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon size={18} />
                  <span className="text-sm font-medium">{tab.label}</span>
                  {tab.badge && (
                    <Badge
                      variant="outline"
                      className={cn(
                        "border-muted-foreground/50 text-muted-foreground ml-auto px-1.5 py-0.5 text-xs",
                        activeTabId === tab.id &&
                          "border-primary-foreground/70 text-primary-foreground",
                      )}
                    >
                      {tab.badge}
                    </Badge>
                  )}
                </motion.li>
              ))}
            </ul>
            <div className="min-w-0 flex-grow">
              <div
                id="settings-content-scrollable"
                className="size-full overflow-auto p-6"
              >
                {SETTINGS_TABS.map((tab) => (
                  <TabsContent key={tab.id} value={tab.id}>
                    <tab.component
                      settings={mergedSettings}
                      onChange={handleTabChange}
                    />
                  </TabsContent>
                ))}
              </div>
            </div>
          </div>
        </Tabs>
        <DialogFooter className="px-6 py-4 border-t">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            className="w-24 bg-ghost-gradient hover:opacity-90" 
            type="submit" 
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}