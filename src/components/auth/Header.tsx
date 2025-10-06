import Icon from "../shared/Icon"

function Header({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="text-center">
      <div className="mb-6 flex items-center justify-center gap-4">
        <div className="size-8 text-[var(--primary-color)]">
          <Icon />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">EduConnect</h1>
      </div>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export default Header
