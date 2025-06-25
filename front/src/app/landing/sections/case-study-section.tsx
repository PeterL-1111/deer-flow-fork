// Copyright (c) 2025 Peter Liu
// SPDX-License-Identifier: MIT

import { MessageSquare, TrendingUp, Users, Heart, Briefcase, Handshake, Target, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

import { BentoCard } from "~/components/magicui/bento-grid";

import { SectionHeader } from "../components/section-header";

const caseStudies = [
  {
    id: "tech-startup-founder-outreach",
    icon: TrendingUp,
    title: "Connected with YC startup founder for partnership",
    description:
      "Leveraged shared interests in AI ethics to craft a personalized message that resulted in a 30-minute discovery call and ongoing partnership discussions.",
  },
  {
    id: "sales-director-enterprise-deal",
    icon: Briefcase,
    title: "Secured enterprise sales meeting through LinkedIn research",
    description:
      "Used public speaking analysis and recent company announcements to personalize outreach, leading to a $50K enterprise software evaluation.",
  },
  {
    id: "investor-pitch-connection",
    icon: Target,
    title: "Got investor meeting using mutual connection strategy",
    description:
      "Identified shared university background and mutual connections to secure a 15-minute pitch meeting with a Series A investor.",
  },
  {
    id: "conference-speaker-collaboration",
    icon: Users,
    title: "Landed keynote speaker for company event",
    description:
      "Researched speaker's latest book and podcast appearances to craft compelling event invitation that resulted in confirmed keynote agreement.",
  },
  {
    id: "customer-success-testimonial",
    icon: Heart,
    title: "Turned cold prospect into brand advocate",
    description:
      "Used empathetic messaging around shared industry challenges to build trust, resulting in a customer testimonial and referral program participation.",
  },
  {
    id: "recruitment-talent-acquisition",
    icon: UserCheck,
    title: "Recruited top engineering talent from competitor",
    description:
      "Analyzed GitHub contributions and open source projects to personalize talent acquisition message, leading to successful hire.",
  },
  {
    id: "media-influencer-partnership",
    icon: MessageSquare,
    title: "Secured influencer partnership through content analysis",
    description:
      "Studied influencer's content themes and audience engagement to propose authentic brand partnership that aligned with their values.",
  },
  {
    id: "strategic-vendor-negotiation",
    icon: Handshake,
    title: "Improved vendor terms through relationship building",
    description:
      "Used LinkedIn activity analysis to find common ground with procurement director, resulting in 20% cost reduction and better contract terms.",
  },
];

export function CaseStudySection() {
  return (
    <section className="relative container hidden flex-col items-center justify-center py-20 md:flex">
      <SectionHeader
        anchor="case-studies"
        title="Success Stories"
        description="Real results from personalized cold outreach campaigns."
      />
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {caseStudies.map((caseStudy, index) => (
          <motion.div 
            key={caseStudy.title} 
            className="w-full p-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <BentoCard
              {...{
                Icon: caseStudy.icon,
                name: caseStudy.title,
                description: caseStudy.description,
                href: `/chat?replay=${caseStudy.id}`,
                cta: "View outreach strategy",
                className: "w-full h-full shadow-soft hover:shadow-md",
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}