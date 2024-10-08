import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import OpenAPIViewer from './components/OpenAPIViewer'
import FloatingSearch from './components/FloatingSearch'
import { apis } from './apis'

interface Endpoint {
  path: string;
  method: string;
  summary: string;
  apiName: string;
}

function App() {
  const [selectedAPI, setSelectedAPI] = useState<string | null>(apis[0].url)
  const [searchTerm, setSearchTerm] = useState('')
  const [endpoints, setEndpoints] = useState<Endpoint[]>([])
  const [filteredEndpoints, setFilteredEndpoints] = useState<Endpoint[]>([])
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null)
  const openAPIViewerRef = useRef<any>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsSearchOpen(true)
      } else if (event.key === 'Escape') {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    const fetchAllSpecs = async () => {
      const allEndpoints: Endpoint[] = [];
      for (const api of apis) {
        try {
          const response = await fetch(api.url);
          const spec = await response.json();
          Object.entries(spec.paths).forEach(([path, pathItem]: [string, any]) => {
            Object.entries(pathItem).forEach(([method, operation]: [string, any]) => {
              allEndpoints.push({
                path,
                method: method.toUpperCase(),
                summary: operation.summary || '',
                apiName: api.name,
              });
            });
          });
        } catch (error) {
          console.error(`Error fetching spec for ${api.name}:`, error);
        }
      }
      setEndpoints(allEndpoints);
    };

    fetchAllSpecs();
  }, []);

  useEffect(() => {
    const filtered = endpoints.filter(
      (endpoint) =>
        endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
        endpoint.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        endpoint.apiName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEndpoints(filtered);
  }, [searchTerm, endpoints]);

  const handleEndpointClick = (endpoint: Endpoint) => {
    const api = apis.find(api => api.name === endpoint.apiName);
    if (api) {
      setSelectedAPI(api.url);
      const cleanPath = endpoint.path.replace(/\/$/, '');
      setSelectedEndpoint(`${endpoint.method.toUpperCase()} ${cleanPath}`);
      setSearchTerm('');
      setIsSearchOpen(false);
      console.log("Selected endpoint:", `${endpoint.method.toUpperCase()} ${cleanPath}`);
    }
  };

  useEffect(() => {
    if (selectedEndpoint && openAPIViewerRef.current) {
      openAPIViewerRef.current.scrollToOperation(selectedEndpoint);
    }
  }, [selectedEndpoint]);

  const renderHomePage = () => (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to the API Explorer</h1>
      <p className="text-xl mb-8">
        Explore and interact with various APIs provided by the Escritório de Dados. 
        Use the search bar above to find specific endpoints across all APIs.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Available APIs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apis.map((api) => (
          <div key={api.url} className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">{api.name}</h3>
            <p className="mb-4">{api.description}</p>
            <Button onClick={() => setSelectedAPI(api.url)}>
              View Documentation
            </Button>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col w-screen">
        <header className="bg-background shadow-sm">
          <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <h1 
                className="text-2xl font-bold text-primary cursor-pointer hover:underline"
                onClick={() => {
                  setSelectedAPI(null)
                  setSearchTerm('')
                  setSelectedEndpoint(null)
                }}
              >
                APIs Escritório de Dados
              </h1>
              <nav className="flex flex-wrap gap-2">
                {apis.map((api) => (
                  <Button
                    key={api.url}
                    variant={selectedAPI === api.url && !searchTerm ? "default" : "outline"}
                    onClick={() => {
                      setSelectedAPI(api.url)
                      setSearchTerm('')
                      setSelectedEndpoint(null)
                    }}
                  >
                    {api.name}
                  </Button>
                ))}
              </nav>
            </div>
            <div className="w-full sm:w-auto mt-4 sm:mt-0 relative">
              <Button
                onClick={() => setIsSearchOpen(true)}
                className="w-full sm:w-64"
              >
                Search endpoints... (⌘K)
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-grow w-screen overflow-auto">
          {searchTerm ? (
            <div className="p-4 space-y-2">
              {filteredEndpoints.map((endpoint, index) => (
                <div 
                  key={index} 
                  className="p-2 border rounded cursor-pointer hover:bg-gray-100"
                  onClick={() => handleEndpointClick(endpoint)}
                >
                  <div className="font-bold">{endpoint.apiName}</div>
                  <div>
                    <span className="font-mono bg-gray-200 px-1 rounded">{endpoint.method}</span> {endpoint.path}
                  </div>
                  <div className="text-sm text-gray-600">{endpoint.summary}</div>
                </div>
              ))}
            </div>
          ) : selectedAPI ? (
            <OpenAPIViewer 
              specUrl={selectedAPI} 
              ref={openAPIViewerRef}
              selectedEndpoint={selectedEndpoint}
            />
          ) : (
            renderHomePage()
          )}
        </main>
        <FloatingSearch
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredEndpoints={filteredEndpoints}
          onEndpointClick={handleEndpointClick}
        />
      </div>
    </Router>
  )
}

export default App
