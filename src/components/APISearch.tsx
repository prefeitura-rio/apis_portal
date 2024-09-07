import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apis } from '../apis';

interface Endpoint {
  path: string;
  method: string;
  summary: string;
  apiName: string;
}

function APISearch() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEndpoints, setFilteredEndpoints] = useState<Endpoint[]>([]);

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

  return (
    <div className="p-4">
      <Input
        type="text"
        placeholder="Search endpoints..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <div className="space-y-2">
        {filteredEndpoints.map((endpoint, index) => (
          <div key={index} className="p-2 border rounded">
            <div className="font-bold">{endpoint.apiName}</div>
            <div>
              <span className="font-mono bg-gray-200 px-1 rounded">{endpoint.method}</span> {endpoint.path}
            </div>
            <div className="text-sm text-gray-600">{endpoint.summary}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default APISearch;