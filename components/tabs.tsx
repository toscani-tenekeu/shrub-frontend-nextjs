"use client"

import type { FileType } from "@/components/editor-layout"
import { useMobile } from "@/hooks/use-mobile"

interface TabsProps {
  files: FileType[]
  activeFile: FileType
  onFileSelect: (file: FileType) => void
}

export function Tabs({ files, activeFile, onFileSelect }: TabsProps) {
  const isMobile = useMobile()

  return (
    <div className="flex border-b border-zinc-800 bg-zinc-900 overflow-x-auto">
      {files.map((file) => (
        <div
          key={file.name}
          className={`flex items-center px-3 py-2 border-r border-zinc-800 cursor-pointer ${
            activeFile.name === file.name
              ? "bg-zinc-800 text-white"
              : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
          }`}
          onClick={() => onFileSelect(file)}
        >
          <span className={`text-sm truncate ${isMobile ? "max-w-[100px]" : "max-w-[120px]"}`}>{file.name}</span>
        </div>
      ))}
    </div>
  )
}

