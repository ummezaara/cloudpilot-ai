import Link from "next/link";
import { ArrowRight, Blocks } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="absolute inset-0 bg-blueprint bg-blueprint-fade" aria-hidden />
      <div
        className="absolute left-1/2 top-1/3 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]"
        aria-hidden
      />

      <header className="relative z-10">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
              <Blocks className="h-4 w-4" strokeWidth={2} />
            </span>
            <span className="font-display text-[15px] font-semibold tracking-tight">
              CloudPilot <span className="text-primary">AI</span>
            </span>
          </div>
          <Button asChild size="sm">
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-muted-foreground">
          <span className="flex h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="font-mono">Built on Claude · AWS Well-Architected</span>
        </div>

        <h1 className="mt-6 max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Design Production-Ready <span className="text-primary">AWS Architectures</span> with AI
        </h1>

        <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          Describe your application in plain English and instantly generate AWS
          architectures, diagrams, Terraform templates, and cost estimates.
        </p>

        <Button asChild size="lg" className="group mt-9">
          <Link href="/dashboard">
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </main>
    </div>
  );
}
