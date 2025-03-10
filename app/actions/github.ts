'use server'
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function createIssue({ userId, title, description, language, url, repo, issueNumber, amount, status, txid }: { userId: string, title: string, description: string, url: string, language: string, repo: string, issueNumber: number, amount: number, status: string, txid: string }) {
    
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
            txid,
            status
        }
    })
    return issue;
}


export async function getIssues() {
    const issues = await prisma.issue.findMany()
    return issues
}

export async function getIssueById(id: string) {
    const issue = await prisma.issue.findUnique({
        where: {
            id
        }
    })
    return issue
}

export async function updateIssueStatus(id: string, status: string) {
    const issue = await prisma.issue.update({
        where: {
            id
        },
        data: {
            status
        }
    })
    return issue
}

export async function getEmailById(id: string) {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })
    return user?.email
}