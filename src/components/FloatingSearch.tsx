import React, { useRef, useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";

interface Endpoint {
  path: string;
  method: string;
  summary: string;
  apiName: string;
}

interface FloatingSearchProps {
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredEndpoints: Endpoint[];
  onEndpointClick: (endpoint: Endpoint) => void;
}

const FloatingSearch: React.FC<FloatingSearchProps> = ({ 
  isOpen, 
  onClose, 
  searchTerm, 
  setSearchTerm, 
  filteredEndpoints,
  onEndpointClick
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [filteredEndpoints]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredEndpoints.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > -1 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredEndpoints.length > 0) {
        const selectedEndpoint = selectedIndex >= 0 ? filteredEndpoints[selectedIndex] : filteredEndpoints[0];
        onEndpointClick(selectedEndpoint);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search endpoints..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-4 text-lg"
        />
        {filteredEndpoints.length > 0 && (
          <div className="max-h-96 overflow-y-auto">
            {filteredEndpoints.map((endpoint, index) => (
              <div 
                key={index} 
                className={`p-2 cursor-pointer ${index === selectedIndex ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                onClick={() => {
                  onEndpointClick(endpoint);
                  onClose();
                }}
              >
                <div className="font-bold">{endpoint.apiName}</div>
                <div>
                  <span className="font-mono bg-gray-200 px-1 rounded">{endpoint.method}</span> {endpoint.path}
                </div>
                <div className="text-sm text-gray-600">{endpoint.summary}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingSearch;