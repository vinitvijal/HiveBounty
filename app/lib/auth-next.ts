'use server'
import { auth, signIn, signOut } from '@/auth'

export async function SignIn() {
  return await signIn('github')
}

export async function SignOut() {
    return await signOut()
  }

  
export async function Auth() {
    return await auth()
  }