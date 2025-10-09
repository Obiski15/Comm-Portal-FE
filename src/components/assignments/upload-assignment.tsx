"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { CloudUpload, X } from "lucide-react"
import Dropzone from "react-dropzone"
import { toast } from "sonner"

import { cn } from "@/lib/utils"

import { useFormField } from "../ui/form"

function UploadAssignment() {
  const [files, setFiles] = useState<File[] | null>(null)
  const [preview, setPreview] = useState<string[]>([])
  const { setValue } = useFormField()

  useEffect(() => {
    if (files) {
      setValue("images", files)
    }
  }, [files, setValue])

  function handleUpdateFiles(index: number) {
    setPreview(prev => prev.filter((_, i) => i !== index))

    setFiles(prev => {
      if (!prev) return null

      return Array.from(prev).map((file, i) => {
        if (i !== index) {
          return file
        }
      }) as File[]
    })
  }

  return (
    <>
      <Dropzone
        onDrop={acceptedFiles => {
          const files = Array.from(acceptedFiles)
          const totalSize = files.reduce((acc, file) => acc + file.size, 0)

          if (files.length > 3) {
            toast.error("You can upload a maximum of 3 files")
            return
          }

          if (totalSize > 5 * 1024 * 1024) {
            toast.error("Total file size exceeds 5MB")
            return
          }

          setPreview(files.map(file => URL.createObjectURL(file)))
          setFiles(acceptedFiles)
        }}
        onError={e => toast.error(e.message)}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <section
            className={cn(
              "cursor-pointer rounded-md border-2 border-dashed p-6",
              isDragActive ? "border-muted-foreground" : "border-border"
            )}
          >
            <div
              {...getRootProps()}
              className="flex flex-col items-center justify-center gap-4 text-center"
            >
              <input
                {...getInputProps()}
                accept="image/jpeg, image/jpg, image/png"
              />
              <CloudUpload size={40} className="text-primary" />
              <p className="font-semibold">
                Drag &apos;n&apos; drop files here or
              </p>

              <button
                type="button"
                className="text-sm font-bold text-primary hover:underline"
              >
                Browse files
              </button>

              <p className="text-xs text-muted-foreground">
                Accepted file types: JPG, JPEG, PNG. Max size 5MB
              </p>
            </div>
          </section>
        )}
      </Dropzone>

      {!!preview.length && (
        <div className="no_scrollbar flex items-start justify-start gap-2 overflow-x-scroll py-2">
          {preview.map((prev, i) => (
            <div
              key={prev}
              className="relative h-20 w-20 overflow-hidden rounded-md transition-all hover:scale-105"
            >
              <Image
                fill
                src={prev}
                alt="Uploaded file preview"
                className="object-cover"
              />
              <button
                onClick={() => handleUpdateFiles(i)}
                className="absolute right-0.5 top-0.5 cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default UploadAssignment
