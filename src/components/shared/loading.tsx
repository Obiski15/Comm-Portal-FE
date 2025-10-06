import Icon from "./Icon"

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-bounce">
        <Icon />
      </div>
    </div>
  )
}

export default Loading
