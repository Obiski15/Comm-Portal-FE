"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function BackLink() {
  const router = useRouter()

  return (
    <Link
      className="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-6 py-3 text-base font-medium text-gray-300 hover:bg-gray-100 hover:bg-popover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      href="#"
      onClick={e => {
        e.preventDefault()
        router.back()
      }}
    >
      Go Back
    </Link>
  )
}
