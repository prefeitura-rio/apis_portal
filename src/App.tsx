import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import OpenAPIViewer from './components/OpenAPIViewer'
import { apis } from './apis'

function App() {
  const [selectedAPI, setSelectedAPI] = useState<string | null>(apis[0].url)

  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col w-screen">
        <header className="bg-background shadow-sm">
          <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
            <h1 className="text-2xl font-bold text-primary mb-4 sm:mb-0">APIs Escritório de Dados</h1>
            <nav className="flex flex-wrap justify-center gap-2">
              {apis.map((api) => (
                <Button
                  key={api.url}
                  variant={selectedAPI === api.url ? "default" : "outline"}
                  onClick={() => setSelectedAPI(api.url)}
                >
                  {api.name}
                </Button>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-grow w-screen overflow-auto">
          {selectedAPI ? (
            <OpenAPIViewer specUrl={selectedAPI} />
          ) : (
            <div className="container mx-auto p-4 text-center">
              <h2 className="text-2xl font-semibold mb-4">Welcome to API Explorer</h2>
              <p>Select an API from the header to view its documentation.</p>
            </div>
          )}
        </main>
      </div>
    </Router>
  )
}

export default App
