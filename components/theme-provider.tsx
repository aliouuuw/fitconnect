"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
// Remove the separate type import and use the type from next-themes directly
type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}