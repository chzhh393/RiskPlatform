export interface BusinessMetrics {
  time: number;
  successRate: number;
  tps: number;
  baseline: {
    time: number;
    successRate: number;
    tps: number;
  };
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
  errorCount: number;
  warningCount: number;
  total: number;
}

export type BusinessFlowMap = Record<string, BusinessFlow[]>; 