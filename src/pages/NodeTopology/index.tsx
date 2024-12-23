import React from 'react';
import TopologyGraph from './components/TopologyGraph';
import './styles.less';

export interface TopologyNode {
  id: string;
  name: string;
  type: 'node' | 'entry';
  metrics: {
    responseTime: number;
    successRate: number;
    tps: number;
    saturation?: number;
    baseline: {
      responseTime: number;
      successRate: number;
      tps: number;
      saturation?: number;
    };
  };
  icons?: string[];
  iconStatus?: Partial<Record<string, ComponentStatus>>;
}

interface ComponentStatus {
  status: 'healthy' | 'error' | 'unused';
  risks?: {
    jitter: boolean;
    limiting: boolean;
    performance: boolean;
  };
  faultCount?: number;
}

const mockData = {
  nodes: [
    {
      id: 'pay-complete',
      name: '支付完成',
      type: 'entry' as const,
      metrics: {
        responseTime: 2508,
        successRate: 99.89,
        tps: 36,
        baseline: {
          responseTime: 600,
          successRate: 99.9,
          tps: 50,
        }
      }
    },
    {
      id: 'pay-notify',
      name: '支付结果通知',
      type: 'entry' as const,
      metrics: {
        responseTime: 2108,
        successRate: 99.92,
        tps: 38,
        baseline: {
          responseTime: 600,
          successRate: 99.9,
          tps: 50,
        }
      }
    },
    {
      id: 'debt-query',
      name: '欠费查询',
      type: 'entry' as const,
      metrics: {
        responseTime: 1508,
        successRate: 99.95,
        tps: 42,
        baseline: {
          responseTime: 600,
          successRate: 99.9,
          tps: 50,
        }
      }
    },
    {
      id: 'submit-order',
      name: '提交订单',
      type: 'entry' as const,
      metrics: {
        responseTime: 3008,
        successRate: 99.89,
        tps: 36,
        baseline: {
          responseTime: 600,
          successRate: 99.9,
          tps: 50,
        }
      },
      iconStatus: {
        db: {
          status: 'error' as const,
          faultCount: 3,
          risks: {
            jitter: false,
            limiting: false,
            performance: false
          }
        }
      }
    },
    {
      id: 'request-settle',
      name: '请求结算',
      type: 'entry' as const,
      metrics: {
        responseTime: 2708,
        successRate: 99.91,
        tps: 39,
        baseline: {
          responseTime: 600,
          successRate: 99.9,
          tps: 50,
        }
      }
    },
    {
      id: 'order-data',
      name: '订单中心数据服务',
      type: 'node' as const,
      metrics: {
        responseTime: 42,
        successRate: 99.99,
        tps: 40,
        saturation: 80,
        baseline: {
          responseTime: 32,
          successRate: 99.9,
          tps: 50,
          saturation: 56
        }
      },
      icons: ['db'],
      iconStatus: {
        db: {
          status: 'error' as const,
          faultCount: 3,
          risks: {
            jitter: false,
            limiting: false,
            performance: false
          }
        }
      }
    },
    {
      id: 'order-domain',
      name: '订单中心中台服务',
      type: 'node' as const,
      metrics: {
        responseTime: 51,
        successRate: 99.98,
        tps: 38,
        saturation: 46,
        baseline: {
          responseTime: 50,
          successRate: 99.9,
          tps: 50,
          saturation: 80
        }
      },
      icons: ['db', 'cache'],
      iconStatus: {
        db: {
          status: 'error' as const,
          faultCount: 3,
          risks: {
            jitter: false,
            limiting: false,
            performance: false
          }
        },
        cache: {
          status: 'healthy' as const,
          risks: {
            jitter: false,
            limiting: true,
            performance: false
          },
          faultCount: 1
        }
      }
    },
    {
      id: 'order-sync',
      name: '订单中心同步服务',
      type: 'node' as const,
      metrics: {
        responseTime: 45,
        successRate: 99.97,
        tps: 41,
        saturation: 52,
        baseline: {
          responseTime: 40,
          successRate: 99.9,
          tps: 50,
          saturation: 80
        }
      },
      icons: ['mq'],
      iconStatus: {
        mq: {
          status: 'healthy' as const,
          risks: {},
          faultCount: 0
        }
      }
    },
    {
      id: 'pay-front',
      name: '支付中心前台服务',
      type: 'node' as const,
      metrics: {
        responseTime: 28,
        successRate: 99.99,
        tps: 38,
        saturation: 55,
        baseline: {
          responseTime: 27,
          successRate: 99.9,
          tps: 50,
          saturation: 80
        }
      },
      icons: ['cache'],
      iconStatus: {
        cache: 'healthy'
      }
    },
    {
      id: 'user-front',
      name: '用户中心前台服务',
      type: 'node' as const,
      metrics: {
        responseTime: 35,
        successRate: 99.98,
        tps: 43,
        saturation: 48,
        baseline: {
          responseTime: 30,
          successRate: 99.9,
          tps: 50,
          saturation: 80
        }
      }
    },
    {
      id: 'province-custom',
      name: '省公司个性化需求服务',
      type: 'node' as const,
      metrics: {
        responseTime: 62,
        successRate: 99.95,
        tps: 35,
        saturation: 65,
        baseline: {
          responseTime: 50,
          successRate: 99.9,
          tps: 50,
          saturation: 80
        }
      }
    },
    {
      id: 'clear-account',
      name: '销账服务',
      type: 'node' as const,
      metrics: {
        responseTime: 48,
        successRate: 99.97,
        tps: 39,
        saturation: 58,
        baseline: {
          responseTime: 45,
          successRate: 99.9,
          tps: 50,
          saturation: 80
        }
      }
    }
  ],
  edges: [
    // 业务入口 --> 服务节点的关系
    { source: 'pay-complete', target: 'province-custom' },  // 支付完成 --> 省公司个性化需求服务
    { source: 'pay-notify', target: 'clear-account' },      // 支付结果通知 --> 销账服务
    { source: 'debt-query', target: 'pay-front' },          // 欠费查询 --> 支付中心前台服务
    { source: 'submit-order', target: 'pay-front' },        // 提交订单 --> 支付中心前台服务
    { source: 'request-settle', target: 'pay-front' },      // 请求结算 --> 支付中心前台服务

    // 订单中心前台服务的关系
    { source: 'user-front', target: 'order-data' },         // 订单中心前台服务 --> 订单中心数据服务
    { source: 'user-front', target: 'order-domain' },       // 订单中心前台服务 --> 订单中心中台服务
    { source: 'user-front', target: 'order-sync' },         // 订单中心前台服务 --> 订单中心同步服务
    
    // 指向订单中心前台服务的关系
    { source: 'province-custom', target: 'user-front' },    // 省公司个性化需求服务 --> 订单中心前台服务
    { source: 'clear-account', target: 'user-front' },      // 销账服务 --> 订单中心前台服务
    { source: 'pay-front', target: 'user-front' }           // 支付中心前台服务 --> 订单中心前台服务
  ]
};

const NodeTopologyPage: React.FC = () => {
  return (
    <div className="node-topology-page">
      <TopologyGraph 
        nodes={mockData.nodes as TopologyNode[]} 
        edges={mockData.edges} 
      />
    </div>
  );
};

export default NodeTopologyPage; 