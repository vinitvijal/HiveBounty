"use client"

import type React from "react"

import { useState } from "react"
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
import { useBounties } from "@/app/hooks/useBounties"
import { getIssueData, parseGitHubUrl } from "@/app/utils/github"
import { createIssue } from "@/app/actions/github"
import { Session } from "next-auth"
  
interface CreateBountyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateBountyModal({ open, onOpenChange }: CreateBountyModalProps) {
  const { createBounty } = useBounties();
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

    if (!session){
      alert("Please login to create a bounty")
      setIsSubmitting(false)
      return
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

    console.log(owner, repo, number)
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

    const lang = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`).then(res => res.json()).then(data => data)
    console.log(lang)


    // Create bounty
  


    // setTimeout(() => {
      setIsSubmitting(false)
      onOpenChange(false)
    //   router.push("/dashboard")
    // }, 1500)
  }

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

