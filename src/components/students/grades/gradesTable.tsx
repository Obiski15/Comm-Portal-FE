"use client"

import { useState } from "react"
import Link from "next/link"
import { MoveRight } from "lucide-react"

import GradesHeader from "./gradesHeader"

// .grade-a {
//    background-color: #d1fae5;
//    color: #065f46;
//  }
//  .grade-b {
//    background-color: #fef3c7;
//    color: #92400e;
//  }
//  .grade-c {
//    background-color: #fee2e2;
//    color: #991b1b;
//  }

export default function GradesTable() {
  const [subject, setSubject] = useState("")
  const [grade, setGrade] = useState("")

  return (
    <table className="w-full table-auto">
      <GradesHeader
        subject={subject}
        setSubject={setSubject}
        grade={grade}
        setGrade={setGrade}
      />
      <tbody className="divide-y divide-muted/50">
        <tr>
          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
            Mathematics
          </td>
          <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
            Algebra Quiz 1
          </td>
          <td className="whitespace-nowrap px-6 py-4 text-left text-sm">
            <span className="grade-a inline-flex items-center rounded-full bg-[#065f46] px-3 py-1 text-xs font-semibold">
              A-
            </span>
          </td>
          <td className="whitespace-nowrap px-6 py-4 text-sm">
            <Link
              className="flex items-center gap-2 font-medium text-primary hover:text-primary/80"
              href="/grades/1"
            >
              View Details
              <MoveRight />
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
