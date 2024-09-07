import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface OpenAPIListProps {
  onSelectAPI: (api: string) => void
}

interface APIInfo {
  url: string
  title: string
}

function OpenAPIList({ onSelectAPI }: OpenAPIListProps) {
  const [apis, setApis] = useState<APIInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const apiUrls = [
      'https://api.civitas.rio/openapi.json',
      'https://prontuario-integrado-production-446908838175.us-central1.run.app/openapi.json'
    ]

    const fetchAPIs = async () => {
      try {
        const results = await Promise.all(
          apiUrls.map(async (url) => {
            const response = await fetch(url)
            if (!response.ok) {
              throw new Error(`Failed to fetch ${url}`)
            }
            const data = await response.json()
            return { url, title: data.info?.title || url }
          })
        )
        setApis(results)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch API information')
        setLoading(false)
      }
    }

    fetchAPIs()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Available APIs</h2>
      <ul className="space-y-2">
        {apis.map((api) => (
          <li key={api.url} className="bg-white shadow rounded p-4">
            <Link
              to="/view"
              className="text-blue-600 hover:underline"
              onClick={() => onSelectAPI(api.url)}
            >
              {api.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default OpenAPIList