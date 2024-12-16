import { BusinessScenario } from '../types';

export const mockBusinessData: BusinessScenario[] = [
  {
    id: 'scenario-1',
    name: '去交费',
    key: 'scenario-1',
    entries: [
      { id: 'entry-6', title: '欠费查询', key: 'entry-6', level: '核心', httpEntry: '/emss-eaa-payelec-front/member/p1/f01' },
      // ... 其他 entries
    ]
  },
  // ... 其他场景
];

export interface BusinessScenario {
  id: number;
  name: string;
  entries: BusinessEntry[];
}

export interface BusinessEntry {
  id: number;
  scenarioId: number;
  name: string;
  level: string;
  httpEntry: string;
}

export async function getBusinessTree(): Promise<BusinessScenario[]> {
  // 使用mock数据
  return Promise.resolve(mockBusinessData);
}

export async function getBusinessEntry(id: string): Promise<BusinessEntry | undefined> {
  // 从mock数据中查找
  for (const scenario of mockBusinessData) {
    const entry = scenario.children.find(entry => entry.key === `entry-${id}`);
    if (entry) {
      return Promise.resolve({
        id: parseInt(id),
        scenarioId: parseInt(scenario.key.split('-')[1]),
        name: entry.title,
        level: entry.level,
        httpEntry: entry.httpEntry
      });
    }
  }
  return Promise.resolve(undefined);
} 