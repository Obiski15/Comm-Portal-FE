"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

import { submitAssignmentSchema } from "@/schema/assignment.schema"

import { cn } from "@/lib/utils"
import useSubmitAssignment from "@/hooks/assignment/useSubmitAssignment"

import { Button } from "../ui/button"
import { Form, FormField } from "../ui/form"
import { Textarea } from "../ui/textarea"
import RecordAssignment from "./record-assignment"
import UploadAssignment from "./upload-assignment"

const tabs = [
  { name: "Text", type: "text" },
  { name: "File Upload", type: "image" },
  { name: "Audio Response", type: "audio" },
]

function SubmitAssignment({ assignmentId }: { assignmentId: string }) {
  const { submitAssignment, isSubmitting } = useSubmitAssignment()
  const form = useForm<z.infer<typeof submitAssignmentSchema>>({
    resolver: zodResolver(submitAssignmentSchema),
  })
  const [submissionType, setSubmissionType] = useState<
    "text" | "audio" | "image"
  >("text")

  function handleSetSubmissionType(type: "text" | "audio" | "image") {
    if (type === submissionType) return
    setSubmissionType(type)
  }

  const _onSubmit: SubmitHandler<
    z.infer<typeof submitAssignmentSchema>
  > = data => {
    submitAssignment({ ...data, assignmentId })
  }

  useEffect(() => {
    if (!!Object.keys(form.formState.errors).length) {
      toast.error(form.formState.errors.root?.message)
    }
  }, [form.formState.errors])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(_onSubmit)}>
        <h2 className="mb-4 text-xl font-bold">Your Work</h2>
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex gap-6">
            {tabs.map(({ name, type }) => (
              <button
                type="button"
                key={name}
                onClick={() =>
                  handleSetSubmissionType(type as "text" | "audio" | "image")
                }
                className={cn(
                  "shrink-0 px-1 pb-4 text-sm font-medium",
                  submissionType === type
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-500 hover:border-gray-300 hover:text-muted"
                )}
              >
                {name}
              </button>
            ))}
          </nav>
        </div>
        <div className="py-6">
          {submissionType === "text" ? (
            <FormField
              name="content"
              control={form.control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Type your answer here"
                  className="min-h-48 resize-none border-border text-muted-foreground"
                />
              )}
            />
          ) : submissionType === "image" ? (
            <UploadAssignment />
          ) : (
            <RecordAssignment />
          )}
        </div>
        <div className="flex items-center justify-end gap-3">
          <Button disabled={isSubmitting} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SubmitAssignment
