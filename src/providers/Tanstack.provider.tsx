"use client"

import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode
}) {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,
      },
    },
  })

  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools position="bottom" initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  )
}
