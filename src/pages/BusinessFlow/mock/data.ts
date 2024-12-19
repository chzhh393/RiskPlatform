interface BusinessModule {
  id: string;
  name: string;
  errorCount: number;
  warningCount: number;
  total: number;
}

export const mockBusinessModules: BusinessModule[] = [
  {
    id: 'pay',
    name: '去交费',
    errorCount: 4,
    warningCount: 0,
    total: 6
  },
  {
    id: 'electric',
    name: '电费电量',
    errorCount: 0,
    warningCount: 0,
    total: 4
  },
  {
    id: 'account',
    name: '户号管理',
    errorCount: 0,
    warningCount: 0,
    total: 2
  },
  {
    id: 'balance',
    name: '电费余额',
    errorCount: 0,
    warningCount: 0,
    total: 1
  },
  {
    id: 'user',
    name: '用户中心',
    errorCount: 0,
    warningCount: 0,
    total: 5
  },
  {
    id: 'homepage',
    name: '首页交互',
    errorCount: 0,
    warningCount: 0,
    total: 3
  },
  {
    id: 'miniapp',
    name: '小程序',
    errorCount: 0,
    warningCount: 0,
    total: 9
  },
  {
    id: 'other',
    name: '其它业务',
    errorCount: 0,
    warningCount: 0,
    total: 8
  }
];

export const mockBusinessFlows = {
  'pay': [
    {
      id: 'flow-1',
      name: '欠费查询',
      isError: true,
      metrics: { time: 5424, successRate: 100, tps: 46, tpsError: true }
    },
    {
      id: 'flow-2',
      name: '账单查询',
      isError: true,
      metrics: { time: 6424, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-3',
      name: '提交订单',
      isError: true,
      metrics: { time: 5624, successRate: 100, tps: 45, tpsError: true }
    },
    {
      id: 'flow-4',
      name: '请求结果',
      isError: true,
      metrics: { time: 5924, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-5',
      name: '支付完成',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-6',
      name: '支付结果通知',
      metrics: { time: 106, successRate: 100, tps: 36 }
    }
  ],
  'electric': [
    {
      id: 'flow-7',
      name: '账单查询',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-8',
      name: '户号日电费电量',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-9',
      name: '户号月电费电量',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-10',
      name: '首页账单电费电量',
      metrics: { time: 106, successRate: 100, tps: 36 }
    }
  ],
  'account': [
    {
      id: 'flow-11',
      name: '户号列表',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-12',
      name: '档案查询',
      metrics: { time: 106, successRate: 100, tps: 36 }
    }
  ],
  'balance': [
    {
      id: 'flow-13',
      name: '首页余额',
      metrics: { time: 106, successRate: 100, tps: 36 }
    }
  ],
  'user': [
    {
      id: 'flow-14',
      name: '用户注册',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-15',
      name: '用户登录',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-16',
      name: '华为一键登录',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-17',
      name: '小程序一键登录',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-18',
      name: '手机号变更',
      metrics: { time: 106, successRate: 100, tps: 36 }
    }
  ],
  'homepage': [
    {
      id: 'flow-19',
      name: '展台组',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-20',
      name: '展台接口首页顶部微应用',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-21',
      name: '首页弹窗',
      metrics: { time: 106, successRate: 100, tps: 36 }
    }
  ],
  'miniapp': [
    {
      id: 'flow-22',
      name: '能力开放平台认证',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-23',
      name: '获取能力开放平台token',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-24',
      name: '户号解密',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-25',
      name: '户号列表删除户号',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-26',
      name: '查询用户资产',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-27',
      name: '户号列表跳转确认页面',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-28',
      name: '支付宝生活缴费查询余额',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-29',
      name: '小程序下单',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-30',
      name: '微信小程序账单查询',
      metrics: { time: 106, successRate: 100, tps: 36 }
    }
  ],
  'other': [
    {
      id: 'flow-31',
      name: '实名认证查询',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-32',
      name: '三方实名认证',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-33',
      name: '服务记录查询',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-34',
      name: '服务评价',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-35',
      name: '电子发票查询',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-36',
      name: '任务列表',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-37',
      name: '任务完成',
      metrics: { time: 106, successRate: 100, tps: 36 }
    },
    {
      id: 'flow-38',
      name: '用户签到',
      metrics: { time: 106, successRate: 100, tps: 36 }
    }
  ]
}; 