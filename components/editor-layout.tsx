"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Editor } from "@/components/editor"
import { Preview } from "@/components/preview"
import { Tabs } from "@/components/tabs"
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { useMobile } from "@/hooks/use-mobile"
import { Footer } from "@/components/footer"

// Default file content
const DEFAULT_HTML = `<!DOCTYPE html>
<html>
<head>
  <title>Shrub Editor</title>
  <meta charset="UTF-8" />
</head>
<body>
  <div class="container">
    <h1>Welcome to Shrub Editor</h1>
    <p>Start editing to see your changes in real-time!</p>
    <button id="demo-button">Click me!</button>
  </div>
</body>
</html>`

const DEFAULT_CSS = `body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: #e6e6e6;
  margin: 0;
  padding: 20px;
  height: 100vh;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

h1 {
  color: #4cc9f0;
  margin-bottom: 1rem;
}

p {
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

button {
  background-color: #4361ee;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

button:hover {
  background-color: #3a0ca3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}`

const DEFAULT_JS = `document.getElementById('demo-button').addEventListener('click', function() {
  alert('Hello from Shrub Editor!');
});`

export type FileType = {
  name: string
  language: string
  content: string
}

export type EditorTheme = "light" | "dark"

export function EditorLayout() {
  const [files, setFiles] = useState<FileType[]>([
    { name: "index.html", language: "html", content: DEFAULT_HTML },
    { name: "styles.css", language: "css", content: DEFAULT_CSS },
    { name: "script.js", language: "javascript", content: DEFAULT_JS },
  ])

  const [activeFile, setActiveFile] = useState<FileType>(files[0])
  const [previewContent, setPreviewContent] = useState<string>("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeView, setActiveView] = useState<"editor" | "preview">("editor")
  const [editorTheme, setEditorTheme] = useState<EditorTheme>("dark")
  const isMobile = useMobile()

  // Generate preview content by combining HTML, CSS, and JS
  useEffect(() => {
    const htmlFile = files.find((file) => file.language === "html")
    const cssFile = files.find((file) => file.language === "css")
    const jsFile = files.find((file) => file.language === "javascript")

    if (htmlFile) {
      let html = htmlFile.content

      // Insert CSS
      if (cssFile) {
        html = html.replace("</head>", `<style>${cssFile.content}</style></head>`)
      }

      // Insert JS
      if (jsFile) {
        html = html.replace("</body>", `<script>${jsFile.content}</script></body>`)
      }

      setPreviewContent(html)
    }
  }, [files])

  const handleCodeChange = (newContent: string) => {
    const updatedFiles = files.map((file) => (file.name === activeFile.name ? { ...file, content: newContent } : file))

    setFiles(updatedFiles)
    setActiveFile({ ...activeFile, content: newContent })
  }

  const handleFileSelect = (file: FileType) => {
    setActiveFile(file)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  const handleAddFile = (newFile: FileType) => {
    setFiles([...files, newFile])
    setActiveFile(newFile)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  const handleDeleteFile = (fileName: string) => {
    const updatedFiles = files.filter((file) => file.name !== fileName)
    setFiles(updatedFiles)

    if (activeFile.name === fileName && updatedFiles.length > 0) {
      setActiveFile(updatedFiles[0])
    }
  }

  const toggleEditorTheme = () => {
    setEditorTheme(editorTheme === "light" ? "dark" : "light")
  }

  return (
    <div className="flex flex-col h-screen">
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isMobile={isMobile}
        editorTheme={editorTheme}
        onToggleTheme={toggleEditorTheme}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Mobile Sidebar as Drawer */}
        {isMobile && (
          <div
            className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
              sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className={`absolute top-0 left-0 h-full w-64 bg-zinc-900 transform transition-transform ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar
                files={files}
                activeFile={activeFile}
                onFileSelect={handleFileSelect}
                onAddFile={handleAddFile}
                onDeleteFile={handleDeleteFile}
              />
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        {!isMobile && (
          <Sidebar
            files={files}
            activeFile={activeFile}
            onFileSelect={handleFileSelect}
            onAddFile={handleAddFile}
            onDeleteFile={handleDeleteFile}
          />
        )}

        {/* Mobile View Switcher */}
        {isMobile ? (
          <div className="flex-1 flex flex-col">
            <Tabs files={files} activeFile={activeFile} onFileSelect={handleFileSelect} />

            <div className="bg-zinc-900 border-b border-zinc-800 p-2 flex justify-center">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                    activeView === "editor" ? "bg-zinc-700 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                  onClick={() => setActiveView("editor")}
                >
                  Editor
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                    activeView === "preview" ? "bg-zinc-700 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                  onClick={() => setActiveView("preview")}
                >
                  Preview
                </button>
              </div>
            </div>

            <div className={`flex-1 overflow-hidden ${editorTheme === "light" ? "bg-white" : "bg-zinc-800"}`}>
              {activeView === "editor" ? (
                <Editor
                  content={activeFile.content}
                  language={activeFile.language}
                  onChange={handleCodeChange}
                  theme={editorTheme}
                />
              ) : (
                <Preview content={previewContent} />
              )}
            </div>
          </div>
        ) : (
          // Desktop Layout with Resizable Panels
          <ResizablePanelGroup direction="horizontal" className="flex-1">
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full flex flex-col">
                <Tabs files={files} activeFile={activeFile} onFileSelect={handleFileSelect} />
                <Editor
                  content={activeFile.content}
                  language={activeFile.language}
                  onChange={handleCodeChange}
                  theme={editorTheme}
                />
              </div>
            </ResizablePanel>

            <ResizablePanel defaultSize={50} minSize={30}>
              <Preview content={previewContent} />
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
      <Footer />
    </div>
  )
}

