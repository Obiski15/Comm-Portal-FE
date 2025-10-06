import { cn } from "@/lib/utils"

function Spin({ bg, spin }: { bg?: string; spin?: string }) {
  return (
    <p
      className={cn(
        "size-6 shrink-0 animate-spin rounded-full border-4",
        bg ? bg : "border-primary/30",
        `border-r-${spin ? spin : "primary"}`
      )}
    ></p>
  )
}

export default Spin
