import { Metadata } from "next"

import Assignments from "@/components/assignments/assignments"

export const metadata: Metadata = {
  title: "Assignments",
}

function page() {
  return (
    <main className="h-full p-8">
      <Assignments />
    </main>
  )
}

export default page
