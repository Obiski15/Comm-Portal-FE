export default function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative flex size-full min-h-screen flex-col">
      <div className="flex h-full grow flex-col">
        <main className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-md space-y-8 px-4">{children}</div>
        </main>
      </div>
    </div>
  )
}
