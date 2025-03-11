import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check, Code2, Github, Wallet, Zap, Shield, Users, Trophy, ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full flex items-center justify-center">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
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
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b w-full flex items-center justify-center from-background to-blue-50 dark:from-background dark:to-blue-950/20 py-20 md:py-32">
          <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] " />
          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 w-fit mb-2">
                  Open Source + Hive Blockchain Rewards
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
                  <Link href="/dashboard">
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
                  {/* Decorative elements */}
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
                        <Button size="sm" variant="secondary">
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

        <section className="border-y bg-muted/50 w-full flex items-center justify-center">
          <div className="container px-4 md:px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="flex flex-col items-center justify-center text-center p-4">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">$120K+</div>
                <div className="text-sm text-muted-foreground">Bounties Paid</div>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-4">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2,500+</div>
                <div className="text-sm text-muted-foreground">Active Bounties</div>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-4">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4,800+</div>
                <div className="text-sm text-muted-foreground">Developers</div>
              </div>
              <div className="flex flex-col items-center justify-center text-center p-4">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">850+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-muted text-muted-foreground w-fit">
                Simple Process
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform connects GitHub issues with Hive blockchain rewards in three simple steps
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 md:grid-cols-3 md:gap-12">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 opacity-75 blur-sm"></div>
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-primary-foreground">
                    <span className="text-xl font-bold">1</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold">Create a Bounty</h3>
                <p className="text-muted-foreground">
                  Link your GitHub issue and lock HIVE tokens as a reward for developers who solve it. Set requirements
                  and deadlines to attract the right talent.
                </p>
                <div className="relative w-full h-48 mt-4 rounded-lg overflow-hidden border">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-violet-100/50 dark:from-blue-950/50 dark:to-violet-950/50"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="https://github.blog/wp-content/uploads/2021/06/GitHub-Bug-Bounty_for-social.png?fit=1200%2C630"
                      alt="Create a bounty illustration"
                      className="object-cover h-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 opacity-75 blur-sm"></div>
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-primary-foreground">
                    <span className="text-xl font-bold">2</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold">Solve the Issue</h3>
                <p className="text-muted-foreground">
                  Developers work on the issue and submit their solutions through GitHub. The platform tracks
                  contributions and verifies completed work.
                </p>
                <div className="relative w-full h-48 mt-4 rounded-lg overflow-hidden border">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-violet-100/50 dark:from-blue-950/50 dark:to-violet-950/50"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="https://pbs.twimg.com/media/GM_goe1aQAAkGzf.jpg:large"
                      alt="Solve issue illustration"
                      className="object-cover h-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 opacity-75 blur-sm"></div>
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-primary-foreground">
                    <span className="text-xl font-bold">3</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold">Claim Rewards</h3>
                <p className="text-muted-foreground">
                  Once the issue is closed, the developer can claim the bounty and receive HIVE tokens directly to their
                  wallet. Fast, secure, and transparent.
                </p>
                <div className="relative w-full h-48 mt-4 rounded-lg overflow-hidden border">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-violet-100/50 dark:from-blue-950/50 dark:to-violet-950/50"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="https://cdn3d.iconscout.com/3d/premium/thumb/github-3d-icon-download-in-png-blend-fbx-gltf-file-formats--social-media-logos-logo-brand-golden-pack-icons-9791628.png"
                      alt="Claim rewards illustration"
                      width={320}
                      height={192}
                      className=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-background dark:from-blue-950/20 dark:to-background"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-muted text-muted-foreground w-fit">
                Platform Features
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose HiveBounty</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers unique features that make bounty hunting and creation seamless
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <Card className="relative overflow-hidden border-none bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950/50 dark:to-violet-950/50">
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/10 to-violet-500/10 blur-xl" />
                <CardContent className="p-6 pt-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-primary-foreground mb-4">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Fast Payments</h3>
                  <p className="text-muted-foreground">
                    Receive rewards instantly in your Hive wallet once your contribution is verified. No waiting periods
                    or complex withdrawal processes.
                  </p>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden border-none bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950/50 dark:to-violet-950/50">
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/10 to-violet-500/10 blur-xl" />
                <CardContent className="p-6 pt-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-primary-foreground mb-4">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Secure Escrow</h3>
                  <p className="text-muted-foreground">
                    Funds are locked in smart contracts until the work is completed and verified, ensuring security for
                    both bounty creators and hunters.
                  </p>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden border-none bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950/50 dark:to-violet-950/50">
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/10 to-violet-500/10 blur-xl" />
                <CardContent className="p-6 pt-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-primary-foreground mb-4">
                    <Github className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">GitHub Integration</h3>
                  <p className="text-muted-foreground">
                    Seamless integration with GitHub allows for automatic verification of contributions and issue status
                    tracking.
                  </p>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden border-none bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950/50 dark:to-violet-950/50">
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/10 to-violet-500/10 blur-xl" />
                <CardContent className="p-6 pt-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-primary-foreground mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Community Driven</h3>
                  <p className="text-muted-foreground">
                    Join a thriving community of developers and project owners who collaborate to improve open source
                    software.
                  </p>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden border-none bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950/50 dark:to-violet-950/50">
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/10 to-violet-500/10 blur-xl" />
                <CardContent className="p-6 pt-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-primary-foreground mb-4">
                    <Wallet className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Crypto Rewards</h3>
                  <p className="text-muted-foreground">
                    Get paid in HIVE tokens that can be easily exchanged for other cryptocurrencies or fiat currencies.
                  </p>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden border-none bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950/50 dark:to-violet-950/50">
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/10 to-violet-500/10 blur-xl" />
                <CardContent className="p-6 pt-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-primary-foreground mb-4">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Reputation System</h3>
                  <p className="text-muted-foreground">
                    Build your reputation as a reliable developer or bounty creator through successful transactions and
                    quality work.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-muted text-muted-foreground w-fit">
                Success Stories
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Users Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from developers and project owners who have used HiveBounty
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  quote:
                    "I've earned over 2,000 HIVE tokens by solving bounties in my spare time. It's a great way to contribute to open source while getting paid.",
                  name: "Sharma Anurag Umesh",
                  role: "Blockchain Developer",
                },
                {
                  quote:
                    "As a project maintainer, HiveBounty has helped me attract talented developers to fix critical issues in our codebase quickly.",
                  name: "Vineet",
                  role: "SDE-1",
                },
                {
                  quote:
                    "The verification system ensures that only quality work gets rewarded. It's fair for everyone involved in the bounty process.",
                  name: "Vedant Amrit",
                  role: "Frontend Developer",
                },
              ].map((testimonial, i) => (
                <Card key={i} className="relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-blue-500 to-violet-500" />
                  <CardContent className="p-6">
                    <div className="mb-4 text-4xl text-muted-foreground/40">&quot;</div>
                    <p className="mb-4 text-muted-foreground">{testimonial.quote}</p>
                    <div className="flex items-center gap-2 mt-6">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-primary-foreground font-medium">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-blue-50 dark:from-background dark:to-blue-950/20"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-muted text-muted-foreground w-fit">
                Questions & Answers
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to know about HiveBounty
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-4xl gap-6 md:gap-8 mt-12">
              {[
                {
                  q: "How do I create a bounty?",
                  a: "To create a bounty, you need to connect your Hive wallet, specify a GitHub issue URL, set a reward amount, and provide any additional requirements. The funds will be locked in a smart contract until the issue is resolved.",
                },
                {
                  q: "How are contributions verified?",
                  a: "We verify contributions by checking the GitHub commit history and issue status. When an issue is closed, we analyze who contributed to the solution and ensure they meet the requirements set by the bounty creator.",
                },
                {
                  q: "What fees does HiveBounty charge?",
                  a: "HiveBounty charges a small 2% fee on successful bounty claims to maintain the platform. This fee helps us improve the service and add new features.",
                },
                {
                  q: "Can I work on multiple bounties at once?",
                  a: "Yes, you can work on as many bounties as you want. There's no limit to how many issues you can solve or how many rewards you can claim.",
                },
                {
                  q: "What happens if no one solves my bounty?",
                  a: "If no one solves your bounty within the specified timeframe (if set), you can reclaim your locked funds. If no deadline is set, the funds remain locked until the issue is resolved or you cancel the bounty.",
                },
                {
                  q: "How do I withdraw my HIVE tokens?",
                  a: "HIVE tokens are sent directly to your connected Hive wallet. From there, you can transfer them to exchanges or other wallets as needed.",
                },
              ].map((faq, i) => (
                <div key={i} className="space-y-2 border-b pb-6">
                  <h3 className="text-xl font-bold">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="relative overflow-hidden rounded-lg border bg-background p-8 md:p-12">
              <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-gradient-to-b from-blue-500/20 to-violet-500/20 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-gradient-to-t from-blue-500/20 to-violet-500/20 blur-3xl" />
              <div className="relative grid gap-6 md:grid-cols-2 md:gap-12">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                      Ready to start earning or finding talent?
                    </h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Join HiveBounty today and be part of the future of open source development. Create or claim
                      bounties and get rewarded for your contributions.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link href="/login">
                      <Button className="gap-1 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
                        Get Started <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button variant="outline">Explore Bounties</Button>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative w-full max-w-sm">
                    <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 opacity-20 blur-lg" />
                    <div className="relative aspect-video rounded-lg overflow-hidden border bg-card">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-violet-100/50 dark:from-blue-950/50 dark:to-violet-950/50"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src="https://hive.io/opengraph.png"
                          alt="Platform preview"
                          width={400}
                          height={240}
                          className="object-cover h-full"
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center cursor-pointer">
                          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-primary-foreground">
                            <ArrowUpRight className="h-3 w-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full flex items-center justify-center border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 HiveBounty. All rights reserved.
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

