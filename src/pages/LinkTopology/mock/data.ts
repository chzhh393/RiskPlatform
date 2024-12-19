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
        id: 'scp',
        label: '服务连接平台',
        metrics: {
          time: 26,
          successRate: 99.89,
          tps: 28,
          saturation: 68,
        },
        icons: ['mq', 'cache']
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
        icons: ['db', 'cache']
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
        icons: ['db', 'cache']
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
        icons: ['db', 'cache']
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
        icons: ['db', 'cache']
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
        icons: ['db', 'cache']
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
        icons: ['db', 'cache']
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
        icons: ['db', 'cache']
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
        icons: ['db', 'cache']
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
        icons: ['db', 'cache']
      },
      {
        id: 'payDomain',
        label: '支付中心中台服务',
        metrics: {
          time: 88,
          successRate: 99.97,
          tps: 39,
          saturation: 58,
        },
        icons: ['db', 'cache']
      },
      {
        id: 'orderDomain',
        label: '订单中心中台服务',
        metrics: {
          time: 92,
          successRate: 99.98,
          tps: 38,
          saturation: 46,
        },
        icons: ['db', 'cache']
      }
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