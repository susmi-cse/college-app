"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Utensils, Car } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CardProps {
  href: string;
  title: string;
  description: string;
  icon: React.ElementType;
  delay: number;
  color: string;
  border: string;
  text: string;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-indigo-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="mb-6 inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm text-indigo-300 backdrop-blur-md">
            <span>Welcome to the Future</span>
          </div>
          <h1 className="mb-6 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl">
            Campus Super App
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-400 md:text-xl">
            Everything you need for your college life, unified in one premium experience.
            Marketplace, Canteen, and Transport — redefined.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card
            href="/market"
            title="Marketplace"
            description="Buy, sell, and trade gadgets & books within campus."
            icon={ShoppingBag}
            delay={0.1}
            color="bg-pink-500/10"
            border="border-pink-500/20"
            text="text-pink-400"
          />
          <Card
            href="/canteen"
            title="Smart Canteen"
            description="Pre-order your favorite meals. Skip the queue."
            icon={Utensils}
            delay={0.2}
            color="bg-orange-500/10"
            border="border-orange-500/20"
            text="text-orange-400"
          />
          <Card
            href="/transport"
            title="Ride Share"
            description="Find or offer rides instantly. Commute smarter."
            icon={Car}
            delay={0.3}
            color="bg-cyan-500/10"
            border="border-cyan-500/20"
            text="text-cyan-400"
          />
        </div>
      </div>
    </div>
  );
}

function Card({ href, title, description, icon: Icon, delay, color, border, text }: CardProps) {
  return (
    <Link href={href}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        className={cn(
          "group relative h-full overflow-hidden rounded-3xl border p-8 backdrop-blur-xl transition-colors",
          "bg-white/5 hover:bg-white/10",
          border
        )}
      >
        <div className={cn("mb-6 inline-flex rounded-2xl p-4", color)}>
          <Icon className={cn("h-8 w-8", text)} />
        </div>
        <h2 className="mb-3 text-2xl font-bold text-white">{title}</h2>
        <p className="mb-6 text-gray-400">{description}</p>

        <div className="flex items-center text-sm font-medium text-white group-hover:underline">
          <span className="mr-2">Explore</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </motion.div>
    </Link>
  );
}
