"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Github, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWallet } from "../hooks/useWallet"
import { Input } from "@/components/ui/input"
import { SignIn } from "../lib/auth-next"

export default function LoginPage() {
  const router = useRouter()
  const [isGithubConnecting, setIsGithubConnecting] = useState(false)
  const { account, isConnecting, connect } = useWallet();
  const [username, setUsername] = useState('');

  const handleHiveLogin = async () => {
    if (username.trim()) {
        connect(username.trim());
        setUsername('');
      }
 
  }

  useEffect(()=>{
    if(account){
      console.log(account)
      router.push("/dashboard")
    }
  }, [account])

  const handleGithubLogin = async () => {

    SignIn()
  
  }

  return (
    <main className="w-full flex justify-center">
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button variant="ghost">
          <Wallet className="mr-2 h-4 w-4" />
          HiveBounty
        </Button>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Connect your wallet to access your bounties</p>
        </div>
        <Tabs defaultValue="hive" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hive">Hive Wallet</TabsTrigger>
            <TabsTrigger value="github">GitHub</TabsTrigger>
          </TabsList>
          <TabsContent value="hive">
            <Card>
              <CardHeader>
                <CardTitle>Hive Wallet</CardTitle>
                <CardDescription>Connect your Hive wallet to create and claim bounties</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-4">
                  <Input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Enter Hive Username" disabled={isConnecting}/>
                  <Button className="w-full" onClick={()=>handleHiveLogin()} disabled={isConnecting}>
                    {isConnecting ? "Connecting..." : "Connect Hive Wallet"}
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  You&apos;ll be prompted to approve the connection in your Hive Keychain
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="github">
            <Card>
              <CardHeader>
                <CardTitle>GitHub Account</CardTitle>
                <CardDescription>Connect your GitHub account to verify your contributions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-4">
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => handleGithubLogin()}
                    disabled={isGithubConnecting}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    {isGithubConnecting ? "Connecting..." : "Connect with GitHub"}
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  We only request read access to your public repositories and contributions
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By connecting your wallet, you agree to our{" "}
          <Link href="#" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
    </main>
  )
}

