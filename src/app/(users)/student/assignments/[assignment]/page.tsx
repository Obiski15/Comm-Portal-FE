import { Calendar, ClipboardList, Download, Link, Mic } from "lucide-react"

import AssignmentDetailsDescription from "@/components/students/assignments/assignment-details-description"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

function page() {
  return (
    <main className="flex flex-1 justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="space-y-6">
          <div className="rounded-lg bg-popover/50 p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
              <span>Math 101</span>
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight">
              Assignment: Algebra Practice
            </h1>
            <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar />
                <span>Due: October 26, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <Link />
                <span>1 Attachment</span>
              </div>
            </div>
            <AssignmentDetailsDescription />
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h2 className="mb-3 text-xl font-bold">Attachments</h2>
              <a
                className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-200 p-3 hover:bg-gray-100"
                href="#"
              >
                <div className="flex items-center justify-start gap-3">
                  <ClipboardList className="text-primary" />
                  <span className="font-medium text-popover">
                    algebra_worksheet.pdf
                  </span>
                </div>
                <Download className="text-primary" />
              </a>
            </div>
          </div>
          <div className="rounded-lg bg-popover/50 p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">Your Work</h2>
            <div className="border-b border-gray-200">
              <nav aria-label="Tabs" className="-mb-px flex gap-6">
                <a
                  className="shrink-0 border-b-2 border-primary px-1 pb-4 text-sm font-medium text-primary"
                  href="#"
                >
                  Text
                </a>
                <a
                  className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-muted"
                  href="#"
                >
                  File Upload
                </a>
                <a
                  className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-muted"
                  href="#"
                >
                  Audio Response
                </a>
              </nav>
            </div>
            <div className="py-6">
              <Textarea
                placeholder="Type your answer here"
                className="min-h-48 resize-none border-border text-muted-foreground"
              />
            </div>
            <div className="flex items-center justify-end gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary hover:bg-primary/10">
                <Mic />
              </div>
              <Button>
                <span className="truncate">Submit</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default page
