"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Check, Github, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Session } from "next-auth"
import { Auth } from "@/app/lib/auth-next"
import { Issue } from "@prisma/client"
import { bountySubmission, getEmailById } from "@/app/actions/github"
import { claimHiveTokens } from "@/app/utils/hive"

interface ClaimBountyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bountyId: string
  issueData: Issue
}

export function ClaimBountyModal({ open, onOpenChange, issueData}: ClaimBountyModalProps) {
  const router = useRouter()
  const [session, setSession] = useState<Session | null>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [claimaintId, setClaimaintId] = useState<string | null>(null)


  const handleConnectGithub = () => {
    router.push("/login")
  }

  const handleClaim = async () => {
    if (!session || !session.user || !session.user.id) {
      alert("Please login to claim the bounty")
      return
    }
    if(issueData.claimedStatus === "solved"){
      alert("The bounty has already been claimed.")
      return
    }
    setIsSubmitting(true)
    console.log(issueData)
    const email = await getEmailById(issueData.userId)
    const user = await fetch('https://api.github.com/search/users?q='+email)
    let data = await user.json()
    console.log(data)
    const owner = data.items[0].login
    console.log(owner)
    const issue = await fetch('https://api.github.com/repos/'+owner+'/'+issueData.repo+'/issues/'+issueData.issueNumber+'/timeline')
    data = await issue.json()
    console.log(data)

    const closedEventIndex = data.findIndex((event: { event: string; actor: { login: string } }) => event.event === "closed");
    if (closedEventIndex > 0) {
      const previousEvent = data[closedEventIndex - 1];
      if (previousEvent.actor.login === claimaintId) {
        // transfer bounty to the claimaint
        if(!claimaintId){
          alert("Please connect your GitHub account to claim the bounty.");
          return;
        }
        const res = await claimHiveTokens(claimaintId, issueData.id)
        if(res?.success){
          await bountySubmission({ id: issueData.id, solver: claimaintId, txid: res.txId})
        }
        alert("You have successfully claimed the bounty!");
      } else {
        alert("You are not the contributor who closed this issue.");
      }
    } else {
      alert("No closed event found in the issue timeline.");
    }

    setTimeout(() => {
      setIsSubmitting(false)
      onOpenChange(false)
      // router.push("/profile")
    }, 2000)
  }

  useEffect(() => {
    async function getSession() {
      const session = await Auth()
      setSession(session)
      if(session){
        const user = await fetch('https://api.github.com/search/users?q='+session.user?.email)
        const data = await user.json()
        console.log(data.items[0].login)
        setClaimaintId(data.items[0].login)
      }
    }
    getSession()
  }
  ,[])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Claim Bounty</DialogTitle>
          <DialogDescription>Verify your contribution and claim your reward</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                <Label>GitHub Account</Label>
              </div>
              {session ? (
                <div className="flex items-center gap-1 text-green-600">
                  <Check className="h-4 w-4" />
                  <span className="text-sm font-medium">Connected</span>
                </div>
              ) : (
                <Button size="sm" variant="outline" onClick={handleConnectGithub}>
                  Connect
                </Button>
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Verification</Label>
              <p className="text-sm text-muted-foreground">
                We&apos;ll verify that you contributed to the solution by checking the GitHub commit history.
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Reward</Label>
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                <span className="font-medium">{issueData.amount} HIVE</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The reward will be transferred to your Hive wallet once your contribution is verified.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleClaim} disabled={isSubmitting || !session || issueData.claimedStatus === "solved"}>
            {isSubmitting ? "Processing..." :  issueData.claimedStatus === "solved" ? "Already Claimed" : "Claim Bounty"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

