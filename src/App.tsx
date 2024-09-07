import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import OpenAPIViewer from './components/OpenAPIViewer'
import yaml from 'js-yaml'

interface APIInfo {
  name: string
  url: string
}

interface APIConfig {
  apis: APIInfo[]
}

function App() {
  const [apis, setApis] = useState<APIInfo[]>([])
  const [selectedAPI, setSelectedAPI] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAPIs = async () => {
      try {
        const response = await fetch('/apis.yaml')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const yamlText = await response.text()
        const config = yaml.load(yamlText) as APIConfig
        setApis(config.apis)
        if (config.apis.length > 0) {
          setSelectedAPI(config.apis[0].url)
        }
        setLoading(false)
      } catch (err) {
        console.error('Error fetching APIs:', err)
        setError('Failed to fetch API information')
        setLoading(false)
      }
    }

    fetchAPIs()
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col w-screen">
        <header className="bg-background shadow-sm">
          <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
            <h1 className="text-2xl font-bold text-primary mb-4 sm:mb-0">APIs Escritório de Dados</h1>
            <nav className="flex flex-wrap justify-center gap-2">
              {loading ? (
                <span className="text-sm">Loading APIs...</span>
              ) : error ? (
                <span className="text-sm text-destructive">{error}</span>
              ) : (
                apis.map((api) => (
                  <Button
                    key={api.url}
                    variant={selectedAPI === api.url ? "default" : "outline"}
                    onClick={() => setSelectedAPI(api.url)}
                  >
                    {api.name}
                  </Button>
                ))
              )}
            </nav>
          </div>
        </header>
        <main className="flex-grow w-screen overflow-auto">
          {loading ? (
            <div className="container mx-auto p-4 text-center">Loading API documentation...</div>
          ) : error ? (
            <div className="container mx-auto p-4 text-center text-destructive">{error}</div>
          ) : selectedAPI ? (
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
