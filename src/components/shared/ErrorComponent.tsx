"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Info } from "lucide-react"

function Error({ error, reset }: { error?: string; reset?: () => void }) {
  const router = useRouter()
  return (
    <div className="p-8 text-center">
      <div className="relative mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-primary/20">
        <Info size={60} className="text-primary" />
      </div>
      <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
        Oops! Something Went Wrong
      </h2>
      <p className="mx-auto mb-8 max-w-lg text-base text-foreground/60">
        {error ||
          "We encountered an unexpected issue. Please try again or contact support if the problem persists."}
      </p>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <button
          onClick={() => (reset ? reset() : router.refresh())}
          className="flex h-12 w-full items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-background transition-transform hover:scale-105 sm:w-auto"
        >
          Try Again
        </button>

        <Link
          href="/dashboard"
          className="flex h-12 w-full items-center justify-center rounded-full px-6 text-sm font-bold text-foreground/60 transition-colors hover:bg-foreground/5 sm:w-auto"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default Error
