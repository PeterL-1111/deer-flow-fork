// Copyright (c) 2025 Peter Liu
// SPDX-License-Identifier: MIT

import { motion } from "framer-motion";

export function SectionHeader({
  anchor,
  title,
  description,
}: {
  anchor?: string;
  title: React.ReactNode;
  description: React.ReactNode;
}) {
  return (
    <>
      {anchor && <a id={anchor} className="absolute -top-20" />}
      <motion.div 
        className="mb-16 flex flex-col items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="mb-4 bg-gradient-to-r from-[#5046E5] via-[#6366F1] to-[#10B981] bg-clip-text text-center text-5xl font-bold text-transparent">
          {title}
        </h2>
        <p className="text-muted-foreground text-center text-xl max-w-2xl">
          {description}
        </p>
      </motion.div>
    </>
  );
}