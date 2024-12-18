export interface BusinessModule {
  id: string;
  name: string;
  flowCount: number;
  errorCount: number;
  total: number;
}

export interface BusinessFlow {
  id: string;
  name: string;
  isError?: boolean;
  metrics: {
    time: number;
    successRate: number;
    tps: number;
    tpsError?: boolean;
  };
} 