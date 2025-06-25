import { type UnghostAgentConfig } from "../config/types";

import { resolveServiceURL } from "./resolve-service-url";

declare global {
  interface Window {
    __unghostAgentConfig: UnghostAgentConfig;
  }
}

// Default configuration to use when fetch fails
const defaultConfig: UnghostAgentConfig = {
  // Add default values based on your UnghostAgentConfig type
  // This prevents the application from crashing when the backend is unavailable
};

export async function loadConfig(): Promise<UnghostAgentConfig> {
  try {
    const res = await fetch(resolveServiceURL("./config"));
    
    if (!res.ok) {
      console.warn(`Failed to load config: ${res.status} ${res.statusText}`);
      return defaultConfig;
    }
    
    const config = await res.json();
    return config;
  } catch (error) {
    console.warn("Failed to fetch config, using default configuration:", error);
    return defaultConfig;
  }
}

export function getConfig(): UnghostAgentConfig {
  if (
    typeof window === "undefined" ||
    typeof window.__unghostAgentConfig === "undefined"
  ) {
    // Return default config instead of throwing an error
    console.warn("Config not loaded, using default configuration");
    return defaultConfig;
  }
  return window.__unghostAgentConfig;
}