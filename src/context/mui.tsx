"use client"

import { theme }  from "@/config/MUI.config";
import { ThemeProvider } from "@emotion/react";

interface MuiProviderProps {
    children: React.ReactNode;
}
export default function MuiProvider({children}: MuiProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}
