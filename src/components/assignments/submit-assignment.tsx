"use client"

import useSubmitAssignment from "@/hooks/assignment/useSubmitAssignment"

import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"

function SubmitAssignment() {
  const {} = useSubmitAssignment()

  return (
    <>
      <h2 className="mb-4 text-xl font-bold">Your Work</h2>
      <div className="border-b border-gray-200">
        <nav aria-label="Tabs" className="-mb-px flex gap-6">
          <button className="shrink-0 border-b-2 border-primary px-1 pb-4 text-sm font-medium text-primary">
            Text
          </button>
          <button className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-muted">
            File Upload
          </button>
          <button className="shrink-0 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-muted">
            Audio Response
          </button>
        </nav>
      </div>
      <div className="py-6">
        <Textarea
          placeholder="Type your answer here"
          className="min-h-48 resize-none border-border text-muted-foreground"
        />
      </div>
      <div className="flex items-center justify-end gap-3">
        <Button>
          <span className="truncate">Submit</span>
        </Button>
      </div>
    </>
  )
}

export default SubmitAssignment
