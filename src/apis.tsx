export interface APIInfo {
  name: string;
  url: string;
  description: string;
}

export const apis: APIInfo[] = [
  { 
    name: "CIVITAS", 
    url: "https://api.civitas.rio/openapi.json",
    description: "API for accessing civic data and services in Rio de Janeiro."
  },
  { 
    name: "Prontuário Integrado", 
    url: "https://prontuario-integrado-production-446908838175.us-central1.run.app/openapi.json",
    description: "Integrated medical records API for healthcare services."
  },
  { 
    name: "API Dados Rio", 
    url: "https://api.dados.rio/docs/?format=openapi",
    description: "Open data API providing various datasets about Rio de Janeiro."
  }
];