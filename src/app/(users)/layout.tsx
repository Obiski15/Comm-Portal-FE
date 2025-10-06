import Sidebar from "@/components/shared/sidebar"
import AuthProvider from "@/providers/Auth.provider"
import SocketProvider from "@/providers/Socket.provider"

export default function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SocketProvider>
      <AuthProvider>
        <div className="relative flex size-full h-screen flex-col overflow-x-hidden">
          <div className="flex h-full grow">
            <Sidebar />
            <div className="no_scrollbar flex-1 overflow-y-scroll">
              {children}
            </div>
          </div>
        </div>
      </AuthProvider>
    </SocketProvider>
  )
}
