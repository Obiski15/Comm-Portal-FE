import GradeDescription from "@/components/students/grades/gradeDescription"

function page() {
  return (
    <main className="flex-1 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <nav className="text-sm font-medium text-muted-foreground">
            <a className="hover:text-primary" href="#">
              Grades
            </a>
            <span className="mx-2">/</span>
            <span className="text-[var(--text-primary)]">
              Assignment Details
            </span>
          </nav>
        </div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Math Quiz 1</h1>
          <p className="mt-1 text-muted-foreground">Due: October 15, 2024</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-8 md:col-span-2">
            <section>
              <h2 className="mb-4 text-xl font-bold">Grade</h2>
              <div className="rounded-lg border border-border/50 bg-popover/50 p-6">
                <p className="text-base font-medium text-muted-foreground">
                  Score
                </p>
                <p className="mt-1 text-4xl font-bold text-primary">
                  85
                  <span className="text-2xl text-muted-foreground">/100</span>
                </p>
              </div>
            </section>
            <GradeDescription />
            <section>
              <h2 className="mb-4 text-xl font-bold">Rubric</h2>
              <div className="overflow-x-auto rounded-lg border border-border/50 bg-popover/50">
                <table className="w-full text-sm">
                  <thead className="bg-gray-900/40">
                    <tr>
                      <th className="w-2/5 px-6 py-3 text-left font-medium text-muted-foreground">
                        Criteria
                      </th>
                      <th className="w-1/5 px-6 py-3 text-left font-medium text-muted-foreground">
                        Points
                      </th>
                      <th className="w-2/5 px-6 py-3 text-left font-medium text-muted-foreground">
                        Feedback
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted/50">
                    <tr>
                      <td className="px-6 py-4 font-medium">Problem Solving</td>
                      <td className="px-6 py-4 text-muted-foreground">30/35</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        Excellent approach to problem-solving. Clearly
                        articulated steps and logical reasoning.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">Calculations</td>
                      <td className="px-6 py-4 text-muted-foreground">25/35</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        Minor errors in calculations. Double-check your work to
                        avoid these in the future.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">Presentation</td>
                      <td className="px-6 py-4 text-muted-foreground">30/30</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        Well-organized and easy-to-follow solutions. Clear
                        labeling of answers.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
          <div className="md:col-span-1">
            <section>
              <h2 className="mb-4 text-xl font-bold">Your Submission</h2>
              <div className="rounded-lg border border-border/50 bg-popover/50 p-2">
                <div className="aspect-[3/4] w-full rounded-md bg-cover bg-center bg-no-repeat"></div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

export default page
