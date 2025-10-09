import * as z from "zod"

export const submitAssignmentSchema = z.object({
  content: z.string().optional(),
  images: z.array(z.instanceof(File)).optional().or(z.undefined()),
  audio: z.instanceof(Blob).optional().or(z.undefined()),
})
