"use client"

import { useState } from "react"
import type { FileType } from "@/components/editor-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileCode,
  FileCodeIcon as FileCss,
  FileIcon as FileHtml,
  FileJsonIcon as FileJs,
  FolderOpen,
  Plus,
  Trash2,
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface SidebarProps {
  files: FileType[]
  activeFile: FileType
  onFileSelect: (file: FileType) => void
  onAddFile: (file: FileType) => void
  onDeleteFile: (fileName: string) => void
}

// Update the Sidebar component to be more mobile-friendly
export function Sidebar({ files, activeFile, onFileSelect, onAddFile, onDeleteFile }: SidebarProps) {
  const [newFileName, setNewFileName] = useState("")
  const [newFileType, setNewFileType] = useState("html")
  const isMobile = useMobile()

  const handleAddFile = () => {
    if (!newFileName) return

    let language = "html"
    let extension = ".html"

    if (newFileType === "css") {
      language = "css"
      extension = ".css"
    } else if (newFileType === "javascript") {
      language = "javascript"
      extension = ".js"
    }

    // Add extension if not present
    const fileName = newFileName.endsWith(extension) ? newFileName : `${newFileName}${extension}`

    // Check if file already exists
    if (files.some((file) => file.name === fileName)) {
      alert("A file with this name already exists!")
      return
    }

    onAddFile({
      name: fileName,
      language,
      content: "",
    })

    setNewFileName("")
  }

  const getFileIcon = (language: string) => {
    switch (language) {
      case "html":
        return <FileHtml className="h-4 w-4 text-orange-400" />
      case "css":
        return <FileCss className="h-4 w-4 text-blue-400" />
      case "javascript":
        return <FileJs className="h-4 w-4 text-yellow-400" />
      default:
        return <FileCode className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className={`${isMobile ? "w-full" : "w-56"} bg-zinc-900 border-r border-zinc-800 flex flex-col h-full`}>
      <div className="p-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderOpen className="h-4 w-4 text-zinc-400" />
          <span className="text-sm font-medium text-zinc-200">Files</span>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className={`${isMobile ? "w-[90%]" : "sm:max-w-[425px]"}`}>
            <DialogHeader>
              <DialogTitle>Add New File</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="filename" className="text-sm font-medium">
                  File Name
                </label>
                <Input
                  id="filename"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="e.g. index.html"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="filetype" className="text-sm font-medium">
                  File Type
                </label>
                <Select value={newFileType} onValueChange={setNewFileType}>
                  <SelectTrigger id="filetype">
                    <SelectValue placeholder="Select file type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="css">CSS</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleAddFile}>Add File</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex-1 overflow-auto p-2">
        <ul className="space-y-1">
          {files.map((file) => (
            <li key={file.name}>
              <div
                className={`flex items-center justify-between rounded-md px-2 py-2.5 text-sm ${
                  activeFile.name === file.name
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                } cursor-pointer transition-colors`}
              >
                <div className="flex items-center gap-2 flex-1" onClick={() => onFileSelect(file)}>
                  {getFileIcon(file.language)}
                  <span className="truncate">{file.name}</span>
                </div>

                {files.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-7 w-7 ${isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100 hover:opacity-100"}`}
                    onClick={() => onDeleteFile(file.name)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

