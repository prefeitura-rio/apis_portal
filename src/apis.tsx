export interface APIInfo {
  name: string;
  url: string;
}

export const apis: APIInfo[] = [
  { name: "CIVITAS", url: "https://api.civitas.rio/openapi.json" },
  { name: "Prontuário Integrado", url: "https://prontuario-integrado-production-446908838175.us-central1.run.app/openapi.json" },
  { name: "API Dados Rio", url: "https://api.dados.rio/docs/?format=openapi" }
];