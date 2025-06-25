// Copyright (c) 2025 Peter Liu
// SPDX-License-Identifier: MIT

import { MessageSquare, Users, Brain, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";

import { BentoCard, BentoGrid } from "~/components/magicui/bento-grid";

import { SectionHeader } from "../components/section-header";

const features = [
  {
    Icon: MessageSquare,
    name: "AI-Personalized Messaging",
    description:
      "Transform cold prospects into warm conversations with deeply personalized messages that demonstrate genuine research and understanding of each recipient.",
    href: "https://github.com/PeterL-1111/deer-flow-fork/blob/main/src/prompts/strategizer.md",
    cta: "Learn more",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: Zap,
    name: "Multi-Style Tone Generation",
    description:
      "Choose from Aggressive, Conservative, Go Nuts, or Friendly writing styles to match your brand voice and recipient preferences perfectly.",
    href: "https://github.com/PeterL-1111/deer-flow-fork/blob/main/src/config/report_style.py",
    cta: "Learn more",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: Brain,
    name: "Deep Persona Research",
    description:
      "Uncover professional insights, communication styles, recent activities, and pain points to craft messages that truly resonate.",
    href: "https://github.com/PeterL-1111/deer-flow-fork/blob/main/src/prompts/researcher.md",
    cta: "Learn more",
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Target,
    name: "Strategic Outreach Planning",
    description:
      "AI-powered analysis identifies optimal timing, communication channels, and value propositions for maximum response rates.",
    href: "https://github.com/PeterL-1111/deer-flow-fork/blob/main/src/graph/nodes.py",
    cta: "Learn more",
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: Users,
    name: "Relationship Intelligence",
    description:
      "Discover mutual connections, shared experiences, and common interests to build authentic rapport from the first message.",
    href: "https://github.com/PeterL-1111/deer-flow-fork/blob/main/src/mcp_tools",
    cta: "Learn more",
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-3 lg:row-end-4",
  },
];

export function CoreFeatureSection() {
  return (
    <section className="relative flex w-full flex-col content-around items-center justify-center py-20">
      <SectionHeader
        anchor="core-features"
        title="Core Features"
        description="Discover what makes Unghost Agent the ultimate cold outreach companion."
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="w-full"
      >
        <BentoGrid className="w-3/4 mx-auto lg:grid-cols-2 lg:grid-rows-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <BentoCard {...feature} />
            </motion.div>
          ))}
        </BentoGrid>
      </motion.div>
    </section>
  );
}