"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { ChevronsUpDown } from "lucide-react"

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Props {
  subject: string
  grade: string
  setSubject: Dispatch<SetStateAction<string>>
  setGrade: Dispatch<SetStateAction<string>>
}

const subjects = [
  { name: "mathematics", value: "mathematics" },
  { name: "physics", value: "physics" },
  { name: "chemistry", value: "chemistry" },
  { name: "english language", value: "english language" },
  { name: "biology", value: "biology" },
]

const grades = [
  { name: "A+", value: "A+" },
  { name: "A-", value: "A-" },
  { name: "B+", value: "B+" },
  { name: "B-", value: "B-" },
  { name: "C", value: "C" },
  { name: "D", value: "D" },
  { name: "E", value: "E" },
  { name: "F", value: "F" },
]

export default function GradesHeader({
  grade,
  setGrade,
  subject,
  setSubject,
}: Props) {
  const [openSubjects, setOpenSubjects] = useState(false)
  const [openGrades, setOpenGrades] = useState(false)

  return (
    <thead className="bg-gray-900/40">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <Popover open={openSubjects} onOpenChange={setOpenSubjects}>
            <PopoverTrigger className="flex items-center gap-1">
              Subject
              <ChevronsUpDown />
            </PopoverTrigger>
            <PopoverContent className="w-[150px] p-0">
              <Command>
                <CommandList>
                  <CommandGroup className="space-y-2">
                    {subjects.map(({ name, value }) => (
                      <CommandItem
                        value={value}
                        key={value}
                        onSelect={() => {
                          setOpenSubjects(false)
                          setSubject(subject === value ? "" : value)
                        }}
                        className="border-2 border-green-500"
                      >
                        {name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <div className="flex items-center gap-1">Assignment</div>
        </th>
        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <Popover open={openGrades} onOpenChange={setOpenGrades}>
            <PopoverTrigger className="flex items-center gap-1">
              Grade
              <ChevronsUpDown />
            </PopoverTrigger>
            <PopoverContent className="w-[150px] p-0">
              <Command>
                <CommandList>
                  <CommandGroup className="space-y-2">
                    {grades.map(({ name, value }) => (
                      <CommandItem
                        key={value}
                        value={value}
                        onSelect={() => {
                          setOpenGrades(false)
                          setGrade(grade === value ? "" : value)
                        }}
                        className="border-2 border-green-500"
                      >
                        {name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </th>

        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Feedback
        </th>
      </tr>
    </thead>
  )
}
