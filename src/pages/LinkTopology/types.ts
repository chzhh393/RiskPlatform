export interface Business {
  id: string;
  name: string;
  links: Link[];
}

export interface Link {
  id: string;
  name: string;
  businessId: string;
  topology: string;
}

export interface Node {
  id: string;
  name: string;
  ip: string;
  port: number;
  components: Component[];
}

export interface Component {
  id: string;
  name: string;
  metrics: Metric[];
}

export interface Metric {
  name: string;
  value: number;
  unit: string;
  baseline: {
    min: number;
    max: number;
  };
  status: 'normal' | 'warning' | 'error';
} 