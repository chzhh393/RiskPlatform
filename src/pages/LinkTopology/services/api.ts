import { BusinessScenario } from '../../../entities/business-scenario.entity';

export const getBusinessScenarios = async (): Promise<BusinessScenario[]> => {
  // 将 mock 数据转换为正确的类型
  const mockData = [
    {
      id: 1,
      name: '去交费',
      key: 'scenario-1',
      entries: [
        {
          id: 1,
          title: '欠费查询',
          key: 'entry-6',
          level: '核心',
          httpEntry: '/emss-eaa-payelec-front/member/p1/f01',
        },
        // ... 其他 entries
      ],
    },
    // ... 其他场景
  ];

  return mockData;
}; 