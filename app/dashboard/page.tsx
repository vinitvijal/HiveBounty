"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Code2, Filter, Plus, Search, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateBountyModal } from "@/components/create-bounty-modal"
import { useWallet } from "../hooks/useWallet"
import { useBounties } from "../hooks/useBounties"

// Mock data for bounties
const mockBounties = [
  {
    id: 1,
    title: "Fix pagination in user dashboard",
    repo: "acme/dashboard",
    owner: "acme",
    issueNumber: 123,
    language: "JavaScript",
    amount: 250,
    status: "open",
  },
  {
    id: 2,
    title: "Implement dark mode toggle",
    repo: "acme/ui-components",
    owner: "acme",
    issueNumber: 456,
    language: "TypeScript",
    amount: 150,
    status: "open",
  },
  {
    id: 3,
    title: "Optimize database queries",
    repo: "acme/backend-api",
    owner: "acme",
    issueNumber: 789,
    language: "Python",
    amount: 300,
    status: "open",
  },
  {
    id: 4,
    title: "Fix mobile responsiveness",
    repo: "acme/website",
    owner: "acme",
    issueNumber: 234,
    language: "CSS",
    amount: 100,
    status: "open",
  },
  {
    id: 5,
    title: "Add unit tests for auth module",
    repo: "acme/auth-service",
    owner: "acme",
    issueNumber: 567,
    language: "JavaScript",
    amount: 200,
    status: "open",
  },
]

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { account, disconnect, isConnecting } = useWallet();
  // const Router = useRouter()
  const { createBounty } = useBounties();




  const filteredBounties = mockBounties.filter(
    (bounty) =>
      bounty.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bounty.repo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bounty.language.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  useEffect(() => {
    if (isConnecting) return
    if (!account) {
      // Router.push("/login")
    }
  }, [account, isConnecting])
  
  return (
    <div className="flex flex-col min-h-screen ">
      <header className="border-b flex w-full justify-center items-center">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Code2 className="h-6 w-6" />
            <span>HiveBounty</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <Button variant="ghost" size="sm">
                Profile
              </Button>
            </Link>
              {account && <Button variant="outline" size="sm" onClick={disconnect}>
                <Wallet className="mr-2 h-4 w-4" />
                <span>Connected as @{account.name}</span>
              </Button>}
          </div>
        </div>
      </header>
      <main className=" flex w-full justify-center items-center">
      <div className="flex-1 container py-6 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Bounties</h1>
            <p className="text-muted-foreground">Explore available bounties or create your own</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create Bounty
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bounties..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Bounties</TabsTrigger>
            <TabsTrigger value="created">Created by Me</TabsTrigger>
            <TabsTrigger value="claimed">Claimed by Me</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBounties.map((bounty) => (
                <Link href={`/bounty/${bounty.id}`} key={bounty.id}>
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded">
                          {bounty.language}
                        </span>
                        <span className="text-xs">#{bounty.issueNumber}</span>
                      </div>
                      <CardTitle className="text-lg">{bounty.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">Repository: {bounty.repo}</p>
                      <p className="text-sm text-muted-foreground">Owner: {bounty.owner}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-3 border-t">
                      <div className="flex items-center gap-1">
                        <Wallet className="h-4 w-4 text-primary" />
                        <span className="font-medium">{bounty.amount} HIVE</span>
                      </div>
                      <Button size="sm" variant="secondary">
                        View
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="created" className="mt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground mb-4">You haven&apos;t created any bounties yet</p>
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Create Your First Bounty
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="claimed" className="mt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground mb-4">You haven&apos;t claimed any bounties yet</p>
              <Button variant="outline" asChild>
                <Link href="#all">Explore Available Bounties</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      </main>
      <CreateBountyModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  )
}

