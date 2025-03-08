"use client"

import Link from "next/link"
import { Code2, Github, History, LogOut, Settings, User, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock user data
const mockUser = {
  username: "johndoe",
  walletAddress: "hive:johndoe",
  githubUsername: "johndoe",
  balance: 1250,
  createdBounties: 3,
  claimedBounties: 2,
  transactions: [
    { type: "create", amount: 250, date: "2025-02-15T12:00:00Z", bountyTitle: "Fix pagination in user dashboard" },
    { type: "claim", amount: 150, date: "2025-02-10T15:30:00Z", bountyTitle: "Implement dark mode toggle" },
    { type: "claim", amount: 300, date: "2025-01-25T09:45:00Z", bountyTitle: "Optimize database queries" },
  ],
}

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen  ">
      <header className="border-b w-full flex justify-center">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Code2 className="h-6 w-6" />
            <span>HiveBounty</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm">
                <Wallet className="mr-2 h-4 w-4" />
                <span>Connected</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <div className=" w-full flex justify-center">

      
      <main className="flex-1 container py-6 px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">{mockUser.username}</h3>
                      <p className="text-sm text-muted-foreground">{mockUser.walletAddress}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Hive Balance</span>
                    </div>
                    <span className="font-medium">{mockUser.balance} HIVE</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Github className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">GitHub</span>
                    </div>
                    <Link
                      href={`https://github.com/${mockUser.githubUsername}`}
                      className="font-medium hover:underline"
                      target="_blank"
                    >
                      {mockUser.githubUsername}
                    </Link>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/profile/settings">
                        <Settings className="mr-2 h-4 w-4" /> Account Settings
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" /> Disconnect Wallet
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Created Bounties</span>
                    <span className="font-medium">{mockUser.createdBounties}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Claimed Bounties</span>
                    <span className="font-medium">{mockUser.claimedBounties}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Earned</span>
                    <span className="font-medium">450 HIVE</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Spent</span>
                    <span className="font-medium">250 HIVE</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="transactions">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="created">Created Bounties</TabsTrigger>
                <TabsTrigger value="claimed">Claimed Bounties</TabsTrigger>
              </TabsList>
              <TabsContent value="transactions" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>Your recent transactions on the platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {mockUser.transactions.length > 0 ? (
                      <div className="space-y-4">
                        {mockUser.transactions.map((transaction, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <History className="h-5 w-5" />
                              <div>
                                <p className="font-medium">
                                  {transaction.type === "create" ? "Bounty Created" : "Bounty Claimed"}
                                </p>
                                <p className="text-sm text-muted-foreground">{transaction.bountyTitle}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p
                                className={`font-medium ${
                                  transaction.type === "create" ? "text-red-600" : "text-green-600"
                                }`}
                              >
                                {transaction.type === "create" ? "-" : "+"}
                                {transaction.amount} HIVE
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(transaction.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No transactions yet</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="created" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Created Bounties</CardTitle>
                    <CardDescription>Bounties you have created</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <p className="text-muted-foreground mb-4">No created bounties to display</p>
                      <Button asChild>
                        <Link href="/dashboard">Go to Dashboard</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="claimed" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Claimed Bounties</CardTitle>
                    <CardDescription>Bounties you have successfully claimed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <p className="text-muted-foreground mb-4">No claimed bounties to display</p>
                      <Button variant="outline" asChild>
                        <Link href="/dashboard">Explore Bounties</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      </div>
    </div>
  )
}

