"use client"

import { useState } from "react"
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

interface ClaimBountyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bountyId: string
}

export function ClaimBountyModal({ open, onOpenChange }: ClaimBountyModalProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGithubConnected, setIsGithubConnected] = useState(true)

  const handleConnectGithub = () => {
    // Simulate GitHub connection
    setTimeout(() => {
      setIsGithubConnected(true)
    }, 1000)
  }

  const handleClaim = async () => {
    setIsSubmitting(true)

    // Simulate API call to claim bounty
    setTimeout(() => {
      setIsSubmitting(false)
      onOpenChange(false)
      router.push("/profile")
    }, 2000)
  }

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
              {isGithubConnected ? (
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
                <span className="font-medium">250 HIVE</span>
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
          <Button onClick={handleClaim} disabled={isSubmitting || !isGithubConnected}>
            {isSubmitting ? "Processing..." : "Claim Bounty"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

