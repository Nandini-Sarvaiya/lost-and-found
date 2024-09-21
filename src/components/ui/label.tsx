import * as React from "react"
import { cn } from "@/utils/cn"

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("block text-sm font-medium text-gray-700", className)}
    {...props}
  />
))
Label.displayName = "Label"

export { Label }
