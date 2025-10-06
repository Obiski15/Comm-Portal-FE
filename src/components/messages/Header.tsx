import NewMessage from "./newMessage"

function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <h2 className="text-4xl font-bold">Messages</h2>

      <NewMessage />
    </header>
  )
}

export default Header
