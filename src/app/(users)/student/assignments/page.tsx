import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Assignments",
}

function page() {
  return (
    <main className="flex-1 p-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-4xl font-bold">Assignments</h2>
      </div>
      <div className="mb-6 border-b border-border/50">
        <div className="flex gap-8">
          <Link
            className="border-b-2 border-transparent py-3 font-medium text-gray-500 transition-colors hover:border-gray-300 hover:text-muted"
            href="#"
          >
            All
          </Link>
          <Link className="border-b-2 border-primary py-3 font-bold" href="#">
            Published
          </Link>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl bg-popover/50">
        <table className="w-full text-left">
          <thead className="bg-gray-900/40">
            <tr className="border-b border-border/50">
              <th className="p-4 text-sm font-semibold text-muted-foreground">
                Title
              </th>
              <th className="p-4 text-sm font-semibold text-muted-foreground">
                Due Date
              </th>
              <th className="p-4 text-sm font-semibold text-muted-foreground">
                Status
              </th>
              <th className="p-4 text-sm font-semibold text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted/50">
            <tr className="border-b border-border/50 transition-colors hover:bg-primary/10">
              <td className="p-4 font-medium">
                Essay on &apos;The Great Plains&apos;
              </td>
              <td className="p-4 text-muted-foreground">2024-04-15</td>
              <td className="p-4">
                <span className="rounded-full bg-[#122118] px-3 py-1 text-sm text-primary">
                  Published
                </span>
              </td>
              <td className="p-4 text-right">
                <Link
                  className="font-semibold text-primary hover:underline"
                  href="/assignments/1"
                >
                  View
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default page
