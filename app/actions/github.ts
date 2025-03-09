'use server'

import { signIn } from "@/auth"

export async function GithubAuthServerAction(){    
    await signIn("github")
}