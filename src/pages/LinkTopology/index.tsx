import React from 'react';
import { Card } from 'antd';
import TopologyGraph from './components/TopologyGraph';
import './styles.less';

// 测试数据
const mockData = {
  nodes: [
    {
      id: 'submit',
      name: '提交订单',
      metrics: {
        responseTime: 508,
        successRate: 99.89,
        tps: 36,
        saturation: 65,
        baseline: {
          responseTime: 600,
          successRate: 99.9,
          tps: 50,
          saturation: 80
        }
      },
      icons: ['db', 'mq', 'cache']
    },
    {
      id: 'scp',
      name: '网关服务连接平台',
      metrics: {
        responseTime: 26,
        successRate: 99.99,
        tps: 42,
        saturation: 45,
        baseline: {
          responseTime: 600,
          successRate: 99.9,
          tps: 50,
          saturation: 80
        }
      }
    },
    {
      id: 'payelec',
      name: '支付中心前台服务',
      metrics: {
        responseTime: 228,
        successRate: 99.99,
        tps: 38,
        saturation: 55,
        baseline: {
          responseTime: 600,
          successRate: 99.9,
          tps: 50,
          saturation: 80
        }
      },
      icons: ['cache']
    },
    {
      id: 'order',
      name: '订单中心前台服务',
      metrics: {
        responseTime: 156,
        successRate: 99.95,
        tps: 35,
        saturation: 48,
        baseline: {
          responseTime: 600,
          successRate: 99.9,
          tps: 50,
          saturation: 80
        }
      },
      icons: ['cache']
    },
    {
      id: 'orderData',
      name: '订单中心数据服务',
      metrics: {
        responseTime: 86,
        successRate: 99.99,
        tps: 40,
        saturation: 42,
        baseline: {
          responseTime: 600,
          successRate: 99.9,
          tps: 50,
          saturation: 80
        }
      },
      icons: ['db']
    },
    {
      id: 'orderDomain',
      name: '订单中心中台服务',
      metrics: {
        responseTime: 92,
        successRate: 99.98,
        tps: 38,
        saturation: 46,
        baseline: {
          responseTime: 600,
          successRate: 99.9,
          tps: 50,
          saturation: 80
        }
      }
    },
    {
      id: 'payData',
      name: '支付中心数据服务',
      metrics: {
        responseTime: 78,
        successRate: 99.99,
        tps: 41,
        saturation: 52,
        baseline: {
          responseTime: 600,
          successRate: 99.9,
          tps: 50,
          saturation: 80
        }
      },
      icons: ['db']
    },
    {
      id: 'payDomain',
      name: '支付中心中台服务',
      metrics: {
        responseTime: 88,
        successRate: 99.97,
        tps: 39,
        saturation: 58,
        baseline: {
          responseTime: 600,
          successRate: 99.9,
          tps: 50,
          saturation: 80
        }
      }
    },
    {
      id: 'token',
      name: '用户中心token认证服务',
      metrics: {
        responseTime: 45,
        successRate: 100,
        tps: 45,
        saturation: 35,
        baseline: {
          responseTime: 600,
          successRate: 99.9,
          tps: 50,
          saturation: 80
        }
      },
      icons: ['cache']
    }
  ],
  edges: [
    { source: 'submit', target: 'scp' },
    { source: 'scp', target: 'payelec' },
    { source: 'payelec', target: 'order' },
    { source: 'payelec', target: 'payData' },
    { source: 'payelec', target: 'payDomain' },
    { source: 'payelec', target: 'token' },
    { source: 'order', target: 'orderData' },
    { source: 'order', target: 'orderDomain' }
  ]
};

const LinkTopologyPage: React.FC = () => {
  return (
    <div className="link-topology-page">
      <TopologyGraph 
        nodes={mockData.nodes} 
        edges={mockData.edges} 
      />
    </div>
  );
};

export default LinkTopologyPage; 