"use client"

import { useRef, useEffect } from "react"
import { Editor as MonacoEditor } from "@monaco-editor/react"
import { useMobile } from "@/hooks/use-mobile"
import type { EditorTheme } from "@/components/editor-layout"

interface EditorProps {
  content: string
  language: string
  onChange: (value: string) => void
  theme: EditorTheme
}

export function Editor({ content, language, onChange, theme }: EditorProps) {
  const editorRef = useRef<any>(null)
  const isMobile = useMobile()

  // Force editor to refresh when mobile state or theme changes
  useEffect(() => {
    if (editorRef.current) {
      setTimeout(() => {
        editorRef.current.layout()
      }, 100)
    }
  }, [isMobile, theme])

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor

    // Force a layout update after mounting
    setTimeout(() => {
      editor.layout()
    }, 100)
  }

  // Determine Monaco editor theme based on our theme setting
  const monacoTheme = theme === "light" ? "vs-light" : "vs-dark"

  return (
    <div className={`flex-1 overflow-hidden w-full h-full ${theme === "light" ? "bg-white" : "bg-zinc-800"}`}>
      <MonacoEditor
        height="100%"
        width="100%"
        language={language}
        value={content}
        theme={monacoTheme}
        onChange={(value) => onChange(value || "")}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: isMobile ? 16 : 14,
          lineNumbers: isMobile ? "off" : "on",
          tabSize: 2,
          automaticLayout: true,
          wordWrap: "on",
          padding: { top: isMobile ? 10 : 4 },
          folding: !isMobile,
          glyphMargin: !isMobile,
        }}
        className="w-full h-full"
      />
    </div>
  )
}

