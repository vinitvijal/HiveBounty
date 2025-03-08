import React from 'react'
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, Code2, Github, Wallet, Zap, Shield, Users, Trophy, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"


function page() {
  return (
    <div className='flex flex-col min-h-screen dark'>
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className=" flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Code2 className="h-6 w-6" />
            <span>HiveBounty</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" variant="outline">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>


      <main className='flex-1'>
      <section className="relative md:px-20 overflow-hidden bg-gradient-to-b from-background to-blue-50 dark:from-background dark:to-blue-950/20 py-20 md:py-32">
          <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
          <div className=" px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 w-fit mb-2">
                  Open Source + Blockchain Rewards
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                    Solve Issues. Earn Rewards.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Connect your GitHub skills with Hive blockchain rewards. Create or claim bounties for open source
                    contributions and get paid in cryptocurrency.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/bounties">
                    <Button className="gap-1 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
                      Explore Bounties <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline">Create a Bounty</Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-r from-blue-400 to-violet-400 flex items-center justify-center text-xs font-medium text-white"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Join <span className="font-medium text-foreground">1,200+</span> developers earning rewards
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-sm">
                  <div className="absolute -top-12 -left-12 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
                  <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

                  <div className="relative w-full rounded-lg border bg-card p-6 shadow-xl">
                    <div className="absolute -top-3 -right-3 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 blur-xl" />
                    <div className="absolute -bottom-3 -left-3 h-24 w-24 rounded-full bg-gradient-to-br from-violet-500/20 to-blue-500/20 blur-xl" />

                    <div className="relative space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Github className="h-5 w-5" />
                          <h3 className="font-semibold">Featured Bounty</h3>
                        </div>
                        <span className="text-xs bg-gradient-to-r from-blue-100 to-violet-100 text-blue-800 dark:from-blue-900/60 dark:to-violet-900/60 dark:text-blue-300 px-2 py-1 rounded-full">
                          $250 Value
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded">
                            JavaScript
                          </span>
                          <span className="text-xs">#123</span>
                        </div>
                        <h4 className="font-medium">Fix pagination in user dashboard</h4>
                        <p className="text-sm text-muted-foreground">Repository: acme/dashboard</p>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">Requirements:</div>
                        <ul className="text-xs space-y-1">
                          {["Fix pagination logic", "Update UI components", "Add tests"].map((req, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <Check className="h-3 w-3 text-green-500" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1">
                          <Wallet className="h-4 w-4 text-primary" />
                          <span className="font-medium">250 HIVE</span>
                        </div>
                        <Button size="sm" variant="ghost" className='bg-zinc-50 text-zinc-700 cursor-pointer hover:bg-zinc-100'>
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>



      <footer className="border-t py-6 md:py-0">
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 HiveBounty. All rights reserved. Build with ❤️ by Sharma & Vinu.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default page
