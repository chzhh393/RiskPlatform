import { BusinessScenario } from '../types';

export const mockBusinessData: BusinessScenario[] = [
  {
    id: 'scenario-1',
    name: '去交费',
    key: 'scenario-1',
    entries: [
      { 
        id: 'entry-6', 
        title: '欠费查询', 
        key: 'entry-6', 
        level: '核心', 
        httpEntry: '/emss-eaa-payelec-front/member/p1/f01' 
      }
    ]
  }
];

export async function getBusinessTree(): Promise<BusinessScenario[]> {
  return Promise.resolve(mockBusinessData);
}

export async function getBusinessEntry(id: string): Promise<BusinessEntry | undefined> {
  for (const scenario of mockBusinessData) {
    const entry = scenario.entries.find(entry => entry.key === `entry-${id}`);
    if (entry) {
      return Promise.resolve(entry);
    }
  }
  return Promise.resolve(undefined);
} 