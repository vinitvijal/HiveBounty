"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getIssueData, parseGitHubUrl } from "@/app/utils/github"
import { Session } from "next-auth"
import { BountyContract } from "@/app/contracts/bounty.contract"
import { Auth } from "@/app/lib/auth-next"
import { toast } from "sonner"
import { createIssue } from "@/app/actions/github"
  
interface CreateBountyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  accountName: string
}

export function CreateBountyModal({ open, onOpenChange, accountName }: CreateBountyModalProps) {
  const [session, setSession] = useState<Session | null>()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    issueUrl: "",
    amount: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    console.log(e)

    if (!session || !session.user || !session.user.id) {
      alert("Please login to create a bounty")
      setIsSubmitting(false)
      return
    }

    if (!window.hive_keychain) {
      alert('Hive Keychain extension not found');
      return;
    }


    const data = parseGitHubUrl(formData.issueUrl);
    if (!data) {
      alert("Invalid GitHub issue URL")
      setIsSubmitting(false)
      return
    }
    const { owner, repo, number } = data;
    if (!owner || !repo || !number) {
      alert("Invalid GitHub issue URL")
      setIsSubmitting(false)
      return
    }

    const issueData = await getIssueData(owner, repo, number);
    if (!issueData) {
      alert("Invalid GitHub issue URL")
      setIsSubmitting(false)
      return
    }
    console.log(issueData)
    if (!issueData){
      alert("Invalid GitHub issue URL")
      setIsSubmitting(false)
      return
    }

    const langs = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`).then(res => res.json()).then(data => data)
    console.log(langs)
    // lang is {TypeScript: 129775, CSS: 4674, JavaScript: 474} and I want the name of Highest value
    const langKeys = Object.keys(langs)
    const langValues = Object.values(langs)
    const langIndex = langValues.indexOf(Math.max(...langValues as number[]))
    const lang = langKeys[langIndex]








    const bountyContract = new BountyContract(accountName);
    const response = await bountyContract.createBounty({
      title: issueData.title,
      description: issueData.body,
      githubLink: formData.issueUrl,
      prizePool: parseFloat(formData.amount)
    });





    if (response.success && response.txId) {
      toast.success('Bounty successfully created on Hive blockchain!\n Transaction ID: ' + response.txId);
      const bounty = await createIssue({
        userId: session.user.id,
        title: issueData.title,
        description: issueData.body || "",
        url: formData.issueUrl,
        language: lang,
        repo: repo,
        issueNumber: number,
        amount: parseFloat(formData.amount),
        status: 'open',
        txid: response.txId
      })

      if (bounty) {
        toast.success('Bounty successfully created on HiveBounty!');
      }else{
        toast.error('Failed to create bounty on HiveBounty!');
      }
    } else {
      // setError(response.message);
      toast.error(response.message);
    }
 
    console.log(response)

      setIsSubmitting(false)
      onOpenChange(false)
  }


  useEffect(() => {
    async function fetchSession() {
      const session = await Auth()
      setSession(session)
      console.log(session)
    }
    fetchSession()
  }
  , [])


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create a Bounty</DialogTitle>
            <DialogDescription>
              Link a GitHub issue and set a reward amount for developers to solve it.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="issueUrl">GitHub Issue URL</Label>
              <Input
                id="issueUrl"
                name="issueUrl"
                placeholder="https://github.com/username/repo/issues/123"
                value={formData.issueUrl}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-muted-foreground">
                Enter the full URL to the GitHub issue you want to create a bounty for
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Bounty Amount (HIVE)</Label>
              <div className="relative">
                <Wallet className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="100"
                  className="pl-8"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                This amount will be locked in a smart contract until the issue is resolved
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Additional Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Add any additional details or requirements for the bounty..."
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Bounty"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

