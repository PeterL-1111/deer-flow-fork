// Copyright (c) 2025 Peter Liu
// SPDX-License-Identifier: MIT

import { GithubFilled } from "@ant-design/icons";
import Link from "next/link";
import { motion } from "framer-motion";

import { AuroraText } from "~/components/magicui/aurora-text";
import { Button } from "~/components/ui/button";

import { SectionHeader } from "../components/section-header";

export function JoinCommunitySection() {
  return (
    <section className="flex w-full flex-col items-center justify-center py-20 pb-32">
      <SectionHeader
        anchor="join-community"
        title={
          <AuroraText colors={["#5046E5", "#6366F1", "#10B981", "#34D399"]}>
            Join the Unghost Agent Community
          </AuroraText>
        }
        description="Contribute brilliant ideas to shape the future of Unghost Agent. Collaborate, innovate, and make impacts."
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Button 
          className="text-xl bg-ghost-gradient hover:opacity-90 shadow-glow" 
          size="lg" 
          asChild
        >
          <Link href="https://github.com/PeterL-1111/deer-flow-fork" target="_blank">
            <GithubFilled className="mr-2" />
            Contribute Now
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}