import Header from "@/components/messages/Header"
import Sidebar from "@/components/messages/Sidebar"

export default function MessagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex flex-1 flex-col bg-popover/50 p-8">
      <Header />

      <div className="flex flex-1 gap-8">
        {/* message sidebar */}
        <Sidebar />

        {children}
      </div>
    </main>
  )
}
