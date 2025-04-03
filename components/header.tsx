"use client"

import { Code2, Leaf, Menu, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { EditorTheme } from "@/components/editor-layout"

interface HeaderProps {
  onToggleSidebar: () => void
  isMobile: boolean
  editorTheme: EditorTheme
  onToggleTheme: () => void
}

export function Header({ onToggleSidebar, isMobile, editorTheme, onToggleTheme }: HeaderProps) {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950 py-3 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="mr-1">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <Leaf className="h-6 w-6 text-emerald-500" />
        <h1 className="text-xl font-bold text-white">Shrub</h1>
        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">From Toscanisoft</span>
      </div>

      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onToggleTheme} className="h-8 w-8">
                {editorTheme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Switch to {editorTheme === "light" ? "dark" : "light"} theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button variant="outline" size="sm" className="gap-1.5">
          <Code2 className="h-4 w-4" />
          <span className="hidden sm:inline">Export</span>
        </Button>
      </div>
    </header>
  )
}

