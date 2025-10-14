import Assignment from "@/components/assignments/assignment"

interface Props {
  params: Promise<{ assignment: string }>
}

async function page({ params }: Props) {
  const { assignment } = await params

  return (
    <main className="flex h-full flex-1 justify-center px-4 py-8 sm:px-6 lg:px-8">
      <Assignment assignmentId={assignment} />
    </main>
  )
}

export default page
