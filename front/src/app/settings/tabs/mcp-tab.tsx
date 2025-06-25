// Copyright (c) 2025 Peter Liu
// SPDX-License-Identifier: MIT

import { motion } from "framer-motion";
import { Blocks, PencilRuler, Trash } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";
import { Tooltip } from "~/components/unghost-agent/tooltip";
import type { MCPServerMetadata } from "~/core/mcp";
import { cn } from "~/lib/utils";

import { AddMCPServerDialog } from "../dialogs/add-mcp-server-dialog";

import type { Tab } from "./types";

export const MCPTab: Tab = ({ settings, onChange }) => {
  const [servers, setServers] = useState<MCPServerMetadata[]>(
    settings.mcp.servers,
  );
  const [newlyAdded, setNewlyAdded] = useState(false);
  const handleAddServers = useCallback(
    (servers: MCPServerMetadata[]) => {
      const merged = mergeServers(settings.mcp.servers, servers);
      setServers(merged);
      onChange({ ...settings, mcp: { ...settings.mcp, servers: merged } });
      setNewlyAdded(true);
      setTimeout(() => {
        setNewlyAdded(false);
      }, 1000);
      setTimeout(() => {
        document.getElementById("settings-content-scrollable")?.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    },
    [onChange, settings],
  );
  const handleDeleteServer = useCallback(
    (name: string) => {
      const merged = settings.mcp.servers.filter(
        (server) => server.name !== name,
      );
      setServers(merged);
      onChange({ ...settings, mcp: { ...settings.mcp, servers: merged } });
    },
    [onChange, settings],
  );
  const handleToggleServer = useCallback(
    (name: string, enabled: boolean) => {
      const merged = settings.mcp.servers.map((server) =>
        server.name === name ? { ...server, enabled } : server,
      );
      setServers(merged);
      onChange({ ...settings, mcp: { ...settings.mcp, servers: merged } });
    },
    [onChange, settings],
  );
  const animationProps = {
    initial: { backgroundColor: "gray" },
    animate: { backgroundColor: "transparent" },
    transition: { duration: 1 },
    style: {
      transition: "background-color 1s ease-out",
    },
  };
  return (
    <div className="flex flex-col gap-6">
      <header>
        <div className="flex items-center justify-between gap-2">
          <div>
            <h1 className="text-xl font-semibold text-foreground">MCP Servers</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage Model Context Protocol servers</p>
          </div>
          <AddMCPServerDialog onAdd={handleAddServers} />
        </div>
        <div className="text-muted-foreground markdown text-sm mt-4 p-4 rounded-lg border bg-muted/20">
          The Model Context Protocol boosts Unghost Agent by integrating external
          tools for tasks like private domain searches, web browsing, food
          ordering, and more.{" "}
          <a
            className="text-primary hover:underline"
            target="_blank"
            href="https://modelcontextprotocol.io/"
          >
            Learn more about MCP
          </a>
        </div>
      </header>
      <main>
        <ul id="mcp-servers-list" className="grid gap-4 sm:grid-cols-2">
          {servers.length === 0 ? (
            <div className="col-span-2 flex flex-col items-center justify-center p-8 text-center border rounded-xl bg-muted/10">
              <Blocks className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No MCP Servers</h3>
              <p className="text-muted-foreground mt-2 mb-4">Add MCP servers to extend Unghost Agent's capabilities</p>
              <AddMCPServerDialog onAdd={handleAddServers} />
            </div>
          ) : (
            servers.map((server) => {
              const isNew =
                server.createdAt &&
                server.createdAt > Date.now() - 1000 * 60 * 60 * 1;
              return (
                <motion.li
                  className={
                    "!bg-card group relative overflow-hidden rounded-xl border pb-2 shadow-sm hover:shadow-md transition-all duration-300"
                  }
                  key={server.name}
                  {...(isNew && newlyAdded && animationProps)}
                >
                  <div className="absolute top-3 right-2">
                    <Tooltip title="Enable/disable server">
                      <div className="flex items-center gap-2">
                        <Switch
                          id="airplane-mode"
                          checked={server.enabled}
                          onCheckedChange={(checked) => {
                            handleToggleServer(server.name, checked);
                          }}
                        />
                      </div>
                    </Tooltip>
                  </div>
                  <div className="absolute top-1 right-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Tooltip title="Delete server">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteServer(server.name)}
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </Tooltip>
                  </div>
                  <div
                    className={cn(
                      "flex flex-col items-start px-4 py-3",
                      !server.enabled && "text-muted-foreground",
                    )}
                  >
                    <div
                      className={cn(
                        "mb-2 flex items-center gap-2",
                        !server.enabled && "opacity-70",
                      )}
                    >
                      <div className="text-lg font-medium">{server.name}</div>
                      <div className="flex gap-1">
                        {!server.enabled && (
                          <div className="bg-muted text-muted-foreground h-fit rounded px-1.5 py-0.5 text-xs">
                            Disabled
                          </div>
                        )}
                        <div className="bg-primary text-primary-foreground h-fit rounded px-1.5 py-0.5 text-xs">
                          {server.transport}
                        </div>
                        {isNew && (
                          <div className="bg-green-500 text-white h-fit rounded px-1.5 py-0.5 text-xs">
                            New
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mb-2 text-xs text-muted-foreground">
                      {server.transport === "stdio" ? (
                        <span>Command: {server.command} {server.args?.join(" ")}</span>
                      ) : (
                        <span>URL: {server.url}</span>
                      )}
                    </div>
                    <div
                      className={cn(
                        "flex flex-wrap items-center gap-2",
                        !server.enabled && "opacity-70",
                      )}
                    >
                      <PencilRuler size={16} className="text-primary" />
                      <div className="text-xs font-medium text-muted-foreground">Available tools:</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {server.tools.map((tool) => (
                          <Tooltip key={tool.name} title={tool.description}>
                            <div className="text-muted-foreground border-muted-foreground/30 w-fit rounded-md border px-2 py-0.5 text-xs bg-muted/20">
                              {tool.name}
                            </div>
                          </Tooltip>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })
          )}
        </ul>
      </main>
    </div>
  );
};
MCPTab.icon = Blocks;
MCPTab.displayName = "MCP";
MCPTab.badge = "Beta";
MCPTab.displayName = "MCP";

function mergeServers(
  existing: MCPServerMetadata[],
  added: MCPServerMetadata[],
): MCPServerMetadata[] {
  const serverMap = new Map(existing.map((server) => [server.name, server]));

  for (const addedServer of added) {
    addedServer.createdAt = Date.now();
    addedServer.updatedAt = Date.now();
    serverMap.set(addedServer.name, addedServer);
  }

  const result = Array.from(serverMap.values());
  result.sort((a, b) => b.createdAt - a.createdAt);
  return result;
}