'use server'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function createIssue({ userId, title, description, language, url, repo, issueNumber, amount, status }: { userId: string, title: string, description: string, url: string, language: string, repo: string, issueNumber: number, amount: number, status: string }) {
    
    const existingIssue = await prisma.issue.findFirst({
        where: {
            repo,
            issueNumber
        }
    })

    if (existingIssue) {
        throw new Error('Issue already exists')
    }
    
    const issue = await prisma.issue.create({
        data: {
            userId,
            title,
            description,
            url,
            repo,
            issueNumber,
            amount,
            language,
            status
        }
    })
    return issue;
}


export async function getIssues() {
    const issues = await prisma.issue.findMany()
    return issues
}