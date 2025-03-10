"use client"

import Link from "next/link"
import { CheckCheck, Code2, Github, History, LogOut, Settings, User, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWallet } from "../hooks/useWallet"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Session } from "next-auth"
import { Auth, SignIn, SignOut } from "../lib/auth-next"
import { useRouter } from "next/navigation"
import { Issue } from "@prisma/client"
import { getClaimsByUser } from "../actions/github"

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
  const { account, connect, isConnecting, isKeychainInstalled, disconnect } = useWallet();
  const [username, setUsername] = useState('');
  const [session, setSession] = useState<Session | null>()
  const [userId, setUserId] = useState<string | null>()
  const [transactions, setTransactions] = useState<Issue[]>([])
  const router = useRouter()

  const getLoggedOut = () => {
    disconnect()
    setSession(null);
    router.replace("/")
  }

  const getGithubSignIn = async () => {
    await SignIn()
    getSession()

  }

  const getGithubOut = async () => {
    await SignOut()
    router.refresh()
  }
 
 
  async function getSession(){
    const session = await Auth()
    setSession(session)
    const email = session?.user?.email
    const user = await fetch('https://api.github.com/search/users?q='+email)
    const data = await user.json()
    const owner = data.items[0].login
    setUserId(owner);
    const trans = await getClaimsByUser(owner);
    setTransactions(trans)
  }

  useEffect(()=>{
    getSession()
  }
  ,[])

  if (isConnecting) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold">Connecting your wallet</h2>
          <p className="text-muted-foreground text-center">Please wait while we connect your wallet...</p>
        </div>
      </div>
    );
  }


  if (!account && !isConnecting) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold">Connect your wallet</h2>
          <p className="text-muted-foreground text-center">
            Connect your Hive account to view your profile and manage your account settings
          </p>
          <Input
            placeholder="Enter your Hive username"
            value={username}
            onChange={(e) => {setUsername(e.target.value)}}
            className="w-full"
            disabled={isConnecting}
          />
          <Button
            onClick={() => connect(username)}
            disabled={isConnecting || !isKeychainInstalled}
          >
            Connect with Hive Keychain
          </Button>
        </div>
      </div>
    );
  }

  if (account){
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
                <span>Connected as @{account.name}</span>
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
                      {session?.user?.image ?
                        <img src={session.user.image} alt="Profile" className="h-16 w-16 rounded-full" /> : <User className="h-8 w-8" />}
                    </div>
                    <div>
                      <h3 className="font-medium">{account.name}</h3>
                      <p className="text-sm text-muted-foreground">{account.name}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Hive Balance</span>
                    </div>
                    <span className="font-medium">{account.balance}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Github className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">GitHub</span>
                    </div>
                    {session ? <Link
                      href={`https://github.com/${userId}`}
                      className="font-medium flex gap-2 hover:underline"
                      target="_blank"
                    >
                      {userId
                      } <CheckCheck color="green" />
                    </Link> : <span className="font-medium">Not connected </span>}
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/profile/settings">
                        <Settings className="mr-2 h-4 w-4" /> Account Settings
                      </Link>
                    </Button>
                    <Button variant="outline" onClick={()=>getLoggedOut()} className="w-full justify-start text-red-500 ">
                      <LogOut className="mr-2 h-4 w-4" /> Disconnect Wallet
                    </Button>
                    {session ? <Button variant="outline" onClick={()=>getGithubOut()} className="w-full justify-start text-red-500 ">
                      <LogOut className="mr-2 h-4 w-4" /> Disconnect Github
                    </Button> : 
                    <Button variant="outline" onClick={()=>getGithubSignIn()} className="w-full justify-start">
                      <Github className="mr-2 h-4 w-4" /> Connect with GitHub
                    </Button>}
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
                    {transactions.length > 0 ? (
                      <div className="space-y-4">
                        {transactions.map((transaction, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <History className="h-5 w-5" />
                              <div>
                                <p className="font-medium">
                                   Bounty Claimed
                                </p>
                                <p className="text-sm text-muted-foreground">{transaction.title}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p
                                className={`font-medium ${
                                   "text-green-600"
                                }`}
                              >
                                {"+"}
                                {transaction.amount} HIVE
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {transaction.claimedAt &&
                                (transaction.claimedAt).toLocaleDateString()}
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
};