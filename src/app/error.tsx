"use client"

import Error from "@/components/shared/ErrorComponent"

function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex min-h-screen flex-grow items-center justify-center">
      <Error error={error.message} reset={reset} />
    </main>
  )
}

export default ErrorPage
