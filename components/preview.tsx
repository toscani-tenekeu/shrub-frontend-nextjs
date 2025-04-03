"use client"

import { useEffect, useRef } from "react"
import { Play, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PreviewProps {
  content: string
}

export function Preview({ content }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const refreshPreview = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current
      iframe.srcdoc = content
    }
  }

  useEffect(() => {
    refreshPreview()
  }, [content])

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-zinc-800 bg-zinc-900 p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Play className="h-4 w-4 text-emerald-500" />
          <span className="text-sm font-medium text-zinc-200">Preview</span>
        </div>

        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={refreshPreview}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 bg-white overflow-hidden">
        <iframe
          ref={iframeRef}
          title="preview"
          sandbox="allow-scripts allow-modals"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  )
}

