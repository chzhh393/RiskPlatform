export interface BusinessMetrics {
  time: number;
  successRate: number;
  tps: number;
  tpsError?: boolean;
}

export interface BusinessFlow {
  id: string;
  name: string;
  isError?: boolean;
  metrics: BusinessMetrics;
}

export interface BusinessModule {
  id: string;
  name: string;
  total: number;
  error: number;
}

export type BusinessFlowMap = Record<string, BusinessFlow[]>; 