export const getTopologyData = (_flowId: string) => {
  return {
    nodes: [
      {
        id: 'submit',
        label: '提交订单',
        metrics: {
          time: 5624,
          successRate: 100,
          tps: 45,
          tpsError: true,
        },
      },
      {
        id: 'api',
        label: 'api网关',
        metrics: {
          time: 26,
          successRate: 99.89,
          tps: 28,
          saturation: 68,
        },
      },
      {
        id: 'gateway',
        label: '交费网关服务',
        metrics: {
          time: 26,
          successRate: 99.89,
          tps: 28,
          saturation: 68,
        },
      },
      {
        id: 'front',
        label: '交费前台服务',
        metrics: {
          time: 26,
          successRate: 99.89,
          tps: 28,
          saturation: 68,
        },
      },
      {
        id: 'activity',
        label: '电费活动前台服务',
        metrics: {
          time: 26,
          successRate: 99.89,
          tps: 28,
          saturation: 68,
        },
      },
      {
        id: 'pay',
        label: '支付中心数据服务',
        metrics: {
          time: 26,
          successRate: 99.89,
          tps: 28,
          saturation: 68,
          sqlTime: 302,
        },
      },
      {
        id: 'drds',
        label: 'DRDS',
        metrics: {
          time: 26,
          successRate: 99.99,
          tps: 283,
          connectionPool: 89,
          sqlTime: 442,
          tpsError: true,
        },
      },
      {
        id: 'asset',
        label: '资产中台服务',
        metrics: {
          time: 26,
          successRate: 99.89,
          tps: 28,
          saturation: 68,
        },
      },
      {
        id: 'center',
        label: '交费中台服务',
        metrics: {
          time: 26,
          successRate: 99.89,
          tps: 28,
          saturation: 68,
        },
      },
      {
        id: 'risk',
        label: '风控服务',
        metrics: {
          time: 26,
          successRate: 99.89,
          tps: 28,
          saturation: 68,
        },
      },
    ],
    edges: [
      { source: 'submit', target: 'api' },
      { source: 'api', target: 'gateway' },
      { source: 'gateway', target: 'front' },
      { source: 'front', target: 'activity' },
      { source: 'front', target: 'pay' },
      { source: 'front', target: 'asset' },
      { source: 'front', target: 'center' },
      { source: 'front', target: 'risk' },
      { source: 'pay', target: 'drds' },
    ],
  };
}; 

console.log('Current mock/data.ts content:');