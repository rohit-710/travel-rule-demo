"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Check, Wallet, Copy, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { createAppKit } from '@reown/appkit/react'
import { DefaultSIWX } from '@reown/appkit-siwx'
import { bitcoin, bitcoinTestnet } from '@reown/appkit/networks'
import { BitcoinAdapter } from '@reown/appkit-adapter-bitcoin'
import { useAppKitAccount, useAppKitEvents } from '@reown/appkit/react'

// Add this helper function at the top level
function formatTimestamp(timestamp: number | string | undefined): string {
  if (!timestamp) return 'N/A'
  try {
    // If timestamp is already in milliseconds, use it directly
    // If it's in seconds, multiply by 1000
    const ms = typeof timestamp === 'string' ? parseInt(timestamp) : timestamp
    const date = new Date(ms > 1000000000000 ? ms : ms * 1000)
    return date.toLocaleString()
  } catch (e) {
    console.error('Error formatting timestamp:', e)
    return 'Invalid Date'
  }
}

// WithdrawalContent Component
function WithdrawalContent() {
  const [step, setStep] = useState(1)
  const [walletConnected, setWalletConnected] = useState(false)
  const [signatureVerified, setSignatureVerified] = useState(false)
  const [amount, setAmount] = useState("")
  const [withdrawalComplete, setWithdrawalComplete] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [siwxStatus, setSiwxStatus] = useState<any>(null)

  const { address, isConnected } = useAppKitAccount()
  const events = useAppKitEvents()

  // Handle wallet connection
  useEffect(() => {
    if (isConnected && address) {
      setWalletAddress(address)
      setWalletConnected(true)
      setSignatureVerified(true)
      setStep(2)
    } else {
      // Handle disconnection
      setWalletConnected(false)
      setWalletAddress("")
      setSignatureVerified(false)
      setStep(1)
    }
  }, [isConnected, address])

  // Handle SIWX status display only
  useEffect(() => {
    const checkSiwxStatus = () => {
      const status = localStorage.getItem('@appkit/siwx')
      if (status) {
        try {
          const parsedStatus = JSON.parse(status)
          
          // Handle array structure
          if (Array.isArray(parsedStatus) && parsedStatus.length > 0) {
            const siwxData = parsedStatus[0]
            setSiwxStatus(siwxData)
            // Check if signature exists and is not empty
            setSignatureVerified(!!siwxData.signature)
          }
        } catch (e) {
          console.error('Failed to parse SIWX status:', e)
          setSignatureVerified(false)
        }
      }
    }

    // Check immediately
    checkSiwxStatus()

    // Set up interval to check for updates
    const interval = setInterval(checkSiwxStatus, 1000)
    return () => clearInterval(interval)
  }, [events.data])

  const completeWithdrawal = () => {
    if (amount && Number.parseFloat(amount) > 0) {
      setWithdrawalComplete(true)
      setStep(4)
    }
  }

  const resetDemo = () => {
    setStep(1)
    setWalletConnected(false)
    setSignatureVerified(false)
    setAmount("")
    setWithdrawalComplete(false)
    setWalletAddress("")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Wallet className="h-5 w-5 text-primary" />
            <span>PortugalEx</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground">
              <ArrowLeft className="mr-1 inline-block h-4 w-4" />
              Back to Home
            </Link>
          </nav>
        </div>
      </header>

      <main className="container flex-1 py-12">
        <div className="mx-auto max-w-[800px]">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Withdrawal Demo</h1>
            <p className="text-muted-foreground">
              Experience how the Travel Rule is implemented during cryptocurrency withdrawals
            </p>
          </div>

          <div className="mb-8">
            <div className="mb-6 flex justify-between">
              <div className="flex items-center gap-2">
                <Badge variant={step >= 1 ? "default" : "outline"}>Step 1</Badge>
                <span className={step >= 1 ? "font-medium" : "text-muted-foreground"}>Connect Wallet</span>
              </div>
              <div className="h-px flex-1 bg-border mx-4"></div>
              <div className="flex items-center gap-2">
                <Badge variant={step >= 2 ? "default" : "outline"}>Step 2</Badge>
                <span className={step >= 2 ? "font-medium" : "text-muted-foreground"}>Ownership Verification</span>
              </div>
              <div className="h-px flex-1 bg-border mx-4"></div>
              <div className="flex items-center gap-2">
                <Badge variant={step >= 3 ? "default" : "outline"}>Step 3</Badge>
                <span className={step >= 3 ? "font-medium" : "text-muted-foreground"}>Complete Withdrawal</span>
              </div>
            </div>
          </div>

          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Connect Your Wallet</CardTitle>
                <CardDescription>
                  Connect your self-custodial wallet to verify ownership before withdrawal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Travel Rule Compliance</AlertTitle>
                    <AlertDescription>
                      To comply with FATF Travel Rule requirements, we need to verify that you own the destination
                      wallet.
                    </AlertDescription>
                  </Alert>

                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                        <Wallet className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="mb-1 text-lg font-medium">Connect with AppKit</h3>
                      <p className="mb-4 text-sm text-muted-foreground">Connect your wallet using AppKit</p>
                      <div className="flex justify-center">
                      <appkit-button />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Wallet Ownership Verification</CardTitle>
                <CardDescription>Sign a message with your wallet to prove ownership</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h3 className="mb-2 font-medium">Message Signed (SIWX Status)</h3>
                    <div className="rounded-md bg-muted p-3 text-sm">
                      {siwxStatus ? (
                        <pre className="whitespace-pre-wrap break-words">
                          {JSON.stringify(siwxStatus, null, 2)}
                        </pre>
                      ) : (
                        <p>Waiting for message signature...</p>
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="mb-4 text-sm text-muted-foreground">
                      This was the message signed using your connected wallet to verify ownership of your EOA account. This is a security
                      measure required by the Travel Rule.
                    </p>
                    <div className="flex justify-center">
                      <appkit-button />
                    </div>
                  </div>

                  {signatureVerified && (
                    <>
                      <Alert className="border-green-500/50 bg-green-500/10">
                        <Check className="h-4 w-4 text-green-500" />
                        <AlertTitle>Verification Successful</AlertTitle>
                        <AlertDescription>
                          Your wallet ownership has been verified. You can now proceed with the withdrawal.
                        </AlertDescription>
                      </Alert>

                      <div className="mt-4">
                        <Button onClick={() => setStep(3)} className="w-full">
                          Continue to Withdrawal
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Complete Your Withdrawal</CardTitle>
                <CardDescription>Enter the amount and confirm your withdrawal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert className="border-primary/50 bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                    <AlertTitle>Wallet Ownership Verified</AlertTitle>
                    <AlertDescription>
                      Your signature has been verified. You can now proceed with the withdrawal.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="wallet">Destination Wallet</Label>
                      <div className="flex items-center gap-2 rounded-md border p-2">
                        <span className="text-sm">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
                        <Badge variant="outline" className="ml-auto">
                          Verified
                        </Badge>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="asset">Asset</Label>
                      <div className="flex items-center gap-2 rounded-md border p-2">
                        <span className="font-medium">BTC</span>
                        <span className="text-sm text-muted-foreground">Bitcoin</span>
                        <Badge variant="outline" className="ml-auto">
                          Balance: 0.5 BTC
                        </Badge>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Min: 0.0001 BTC</span>
                        <span className="text-muted-foreground">Max: 0.5 BTC</span>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label>Network Fee</Label>
                      <div className="flex items-center justify-between rounded-md border p-2">
                        <span className="text-sm">Estimated Network Fee</span>
                        <span className="font-medium">0.0001 BTC</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={completeWithdrawal} disabled={!amount || Number.parseFloat(amount) <= 0}>
                  Confirm Withdrawal
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Successful</CardTitle>
                <CardDescription>Your transaction has been submitted to the network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-center py-8">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="mb-1 text-lg font-medium">Transaction Submitted</h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        Your withdrawal of {amount} BTC has been submitted to the network
                      </p>
                    </div>
                  </div>

                  <div className="rounded-md border p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Transaction Hash</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">0x9a8b...7c6d</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge>Pending</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Estimated Completion</span>
                      <span className="text-sm">~10 minutes</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={resetDemo}>Try Another Withdrawal</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

// Main WithdrawalPage Component
export default function WithdrawalPage() {
  const [appKit, setAppKit] = useState<any>(null)
  const bitcoinAdapter = new BitcoinAdapter({})

  useEffect(() => {
    // Initialize AppKit with SIWX
    const initAppKit = async () => {
      const modal = createAppKit({
        projectId: process.env.NEXT_PUBLIC_APPKIT_PROJECT_ID || "",
        networks: [bitcoin, bitcoinTestnet],
        adapters: [bitcoinAdapter],
        defaultNetwork: bitcoin,
        features: {
          analytics: true
        },
        termsConditionsUrl: 'https://reown.com/terms-of-service',
        privacyPolicyUrl: 'https://reown.com/privacy-policy',
        siwx: new DefaultSIWX(),
        themeMode: 'light'
      })
      setAppKit(modal)
    }
    initAppKit()
  }, [])

  // Only render the content after AppKit is initialized
  if (!appKit) {
    return null
  }

  return <WithdrawalContent />
}

