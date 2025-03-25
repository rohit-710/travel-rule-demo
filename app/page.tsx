import Link from "next/link"
import { ArrowRight, Shield, FileCheck, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <Shield className="h-5 w-5 text-primary" />
            <span>TravelRuleX</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/withdrawal" className="text-sm font-medium text-muted-foreground">
              Demo
            </Link>
            <Link href="/withdrawal">
              <Button size="sm">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Simplifying Cryptocurrency <span className="text-primary">Travel Rule</span> Compliance
            </h1>
            <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
              Secure, compliant, and user-friendly cryptocurrency transfers between exchanges and self-custodial
              wallets.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/withdrawal">
                <Button size="lg" className="gap-2">
                  Try Withdrawal Demo <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 text-center shadow-sm">
              <Shield className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Enhanced Security</h3>
              <p className="text-muted-foreground">
                Verify wallet ownership before transfers to prevent unauthorized withdrawals
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 text-center shadow-sm">
              <FileCheck className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">FATF Compliance</h3>
              <p className="text-muted-foreground">Meet regulatory requirements for Virtual Asset Service Providers</p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-card p-6 text-center shadow-sm">
              <Wallet className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Seamless Experience</h3>
              <p className="text-muted-foreground">
                User-friendly interface for connecting and verifying self-custodial wallets
              </p>
            </div>
          </div>
        </section>

        <section className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container">
            <div className="mx-auto max-w-[980px]">
              <h2 className="mb-12 text-center text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
                How the Travel Rule Works
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">What is the Travel Rule?</h3>
                  <p className="text-muted-foreground">
                    The FATF Travel Rule requires Virtual Asset Service Providers (VASPs) to share sender and recipient
                    information for cryptocurrency transactions above EUR 1,000.
                  </p>
                  <h3 className="text-xl font-bold">Why it matters</h3>
                  <p className="text-muted-foreground">
                    The Travel Rule helps prevent money laundering, terrorist financing, and ensures that cryptocurrency
                    transfers meet the same standards as traditional financial institutions.
                  </p>
                </div>
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <h3 className="mb-4 text-xl font-bold">Key Requirements</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Verify identity of transaction originators and beneficiaries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Share required information between VASPs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Implement secure data transfer protocols</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Maintain records of all transactions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>Apply enhanced due diligence for high-risk transactions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto max-w-[980px] text-center">
            <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
              Ready to see it in action?
            </h2>
            <p className="mb-8 text-muted-foreground">
              Try our interactive withdrawal demo to see how the Travel Rule is implemented in a real-world scenario.
            </p>
            <Link href="/withdrawal">
              <Button size="lg" className="gap-2">
                Try Withdrawal Demo <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 TravelRuleX. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

