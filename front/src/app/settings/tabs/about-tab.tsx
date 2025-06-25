// Copyright (c) 2025 Peter Liu
// SPDX-License-Identifier: MIT

import { BadgeInfo } from "lucide-react";
import { motion } from "framer-motion";

import { Markdown } from "~/components/unghost-agent/markdown";

import about from "./about.md";
import type { Tab } from "./types";

export const AboutTab: Tab = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="prose dark:prose-invert max-w-none"
    >
      <Markdown>{about}</Markdown>
    </motion.div>
  );
};
AboutTab.icon = BadgeInfo;
AboutTab.displayName = "About";