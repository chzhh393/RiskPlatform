export interface BusinessEntry {
  id: string;
  title: string;
  key: string;
  level: string;
  httpEntry: string;
}

export interface BusinessScenario {
  id: string;
  name: string;
  key: string;
  entries: BusinessEntry[];
} 