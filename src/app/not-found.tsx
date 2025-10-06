import Link from "next/link"
import { TriangleAlert } from "lucide-react"

import BackLink from "@/components/shared/notFoundBackLink"

function NotFound() {
  return (
    <div className="flex min-h-screen flex-grow items-center justify-center">
      <div className="px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="inline-block rounded-lg bg-primary/20 p-6">
          <TriangleAlert size={64} className="text-primary" />
        </div>
        <h2 className="mt-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Page Not Found
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            className="inline-flex items-center justify-center rounded-full border border-transparent bg-primary px-6 py-3 text-base font-medium text-background hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            href="/dashboard"
          >
            Go to Homepage
          </Link>
          <BackLink />
        </div>
      </div>
    </div>
  )
}

export default NotFound
