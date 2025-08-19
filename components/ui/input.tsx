import * as React from "react"

import { cn } from "@/lib/utils"


// Input Component avec couleurs améliorées
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-gray-500 selection:bg-orange-200 selection:text-orange-900 border-gray-300 flex h-10 w-full min-w-0 rounded-lg border-2 bg-white px-4 py-2 text-base shadow-sm transition-all duration-200 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100",
        "focus:border-orange-400 focus:ring-2 focus:ring-orange-200 focus:shadow-md",
        "hover:border-gray-400 hover:shadow-md",
        "dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400",
        "dark:focus:border-orange-400 dark:focus:ring-orange-400/20",
        "dark:hover:border-gray-500",
        className
      )}
      {...props}
    />
  )
}

export { Input }
