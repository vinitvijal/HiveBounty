"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, Code2, ExternalLink, Github, History, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClaimBountyModal } from "@/components/claim-bounty-modal"
import { Issue } from "@prisma/client"
import { getIssueById, updateIssueStatus } from "@/app/actions/github"
import { parseGitHubUrl } from "@/app/utils/github"


export default function BountyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter()
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false)
  const [bounty, setBounty] = useState<Issue | null>()
  const [status, setStatus] = useState("open")

  useEffect(() => {
    async function getBounty() {
      const response = await getIssueById(id)
      setBounty(response)

      if (response?.status === "closed"){
        setStatus("closed")
        return
      }

      const url = response?.url
      if (!url) return
      const parse = parseGitHubUrl(url)
      if (!parse) return
      const { owner, repo, number } = parse

      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${number}`)
      const data = await res.json()
      console.log(data)
      setStatus(data.state)
      if (data.state === "closed"){
        // setStatus("closed")
        await updateIssueStatus(id, "closed")
      }
    }

    getBounty()
  }, [id])

  if (!bounty) {
    return <div 
      className="flex items-center justify-center h-screen animate-pulse"
    >Loading...</div>
  }

  return (
    <div className="flex flex-col min-h-screen justify-center">
      <header className="border-b flex justify-center">
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
            <Link href="/">
              <Button variant="outline" size="sm">
                <Wallet className="mr-2 h-4 w-4" />
                <span>Connected</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="flex justify-center">
      <main className="flex-1 container py-6 px-4 md:px-6">
        <Button variant="ghost" size="sm" className="mb-6" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Bounties
        </Button>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded">
                    {bounty.language}
                  </span>
                  <span className="text-xs">#{bounty.issueNumber}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      status === "open"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </div>
                <CardTitle className="text-2xl">{bounty.title}</CardTitle>
                <CardDescription>
                  Repository:{" "}
                  <Link href={`https://github.com/${bounty.repo}`} className="hover:underline" target="_blank">
                    {bounty.repo} <ExternalLink className="inline h-3 w-3" />
                  </Link>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-sm text-muted-foreground">{bounty.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      <Link href={bounty.url} className="text-sm hover:underline" target="_blank">
                        View on GitHub <ExternalLink className="inline h-3 w-3" />
                      </Link>
                    </div>
                    <div className="flex items-center gap-1">
                      <Wallet className="h-5 w-5 text-primary" />
                      <span className="font-medium text-lg">{bounty.amount} HIVE</span>
                    </div>
                  </div>

                  {status === "closed" && (
                    <div className="pt-4">
                      <Button className="w-full" onClick={() => setIsClaimModalOpen(true)}>
                        <Check className="mr-2 h-4 w-4" /> Claim Bounty
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="transactions">
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
              </TabsList>
              <TabsContent value="transactions" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Transaction History</CardTitle>
                    <CardDescription>All transactions related to this bounty</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {bounty.claimedTxid ? (
                      <div className="space-y-4">
                       
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <History className="h-5 w-5" />
                              <div>
                                <p className="font-medium">
                                  Bounty Claimed
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  
                                   To: {bounty.claimedBy}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{bounty.amount} HIVE</p>
                              <p className="text-xs text-muted-foreground">
                                {bounty.claimedAt && bounty.claimedAt.toLocaleDateString()}
                              </p>
                              {bounty.claimedTxid && (
                                <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded">
                                  Txn ID: {bounty.claimedTxid}
                                </span>
                              )}
                            </div>
                          </div>
                        
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No transactions yet</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bounty Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Created by</span>
                    <span className="font-medium">{bounty.userId}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Created on</span>
                    <span className="font-medium">{new Date(bounty.createdAt).toLocaleDateString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <span className={`font-medium ${status === "open" ? "text-green-600" : "text-gray-600"}`}>
                      {status.charAt(0).toUpperCase() +status.slice(1)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Reward</span>
                    <span className="font-medium">{bounty.amount} HIVE</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How to Claim</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 list-decimal list-inside text-sm">
                  <li>Submit your solution on GitHub</li>
                  <li>Wait for the issue to be closed</li>
                  <li>Connect your GitHub account</li>
                  <li>Click the &quot;Claim Bounty&quot; button</li>
                  <li>Receive HIVE tokens in your wallet</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      </div>
      <ClaimBountyModal open={isClaimModalOpen} onOpenChange={setIsClaimModalOpen} issueData={bounty} bountyId={id} />
    </div>
  )
}

