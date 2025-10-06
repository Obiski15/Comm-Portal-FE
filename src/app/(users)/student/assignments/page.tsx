import { Metadata } from "next"

import Assignments from "@/components/assignments/assignments"

export const metadata: Metadata = {
  title: "Assignments",
}

function page() {
  return (
    <main className="flex-1 p-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-4xl font-bold">Assignments</h2>
      </div>

      <Assignments />
    </main>
  )
}

export default page
