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

export interface BusinessFlow {
  id: string;
  name: string;
  url: string;
  isError: boolean;
  metrics: {
    time: number;
    successRate: number;
    tps: number;
    baseline: {
      time: number;
      successRate: number;
      tps: number;
    }
  }
}

export const mockBusinessFlows = {
  'pay': [
    {
      id: 'submit-order',
      name: '提交订单',
      url: '/emss-eaa-payelec-front/member/p2/f01',
      isError: true,
      metrics: {
        time: 5424,
        successRate: 100,
        tps: 46,
        baseline: {
          time: 500,
          successRate: 99.9,
          tps: 50
        }
      }
    },
    {
      id: 'query-arrears',
      name: '欠费查询',
      url: '/emss-eaa-payelec-front/member/p1/f01',
      isError: true,
      metrics: {
        time: 6424,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 400,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'settlement',
      name: '请求结算',
      url: '/emss-eaa-payelec-front/member/p3/f03',
      isError: true,
      metrics: {
        time: 5624,
        successRate: 100,
        tps: 45,
        baseline: {
          time: 300,
          successRate: 99.9,
          tps: 50
        }
      }
    },
    {
      id: 'pay-complete',
      name: '支付完成',
      url: '/emss-eaa-individuation-front/member/c2/f01',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 60,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'pay-notify',
      name: '支付结果通知',
      url: '/emss-eaa-recharge-front/member/c7/f01',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'sync-order',
      name: '交费订单同步（销账）',
      url: '/emss-pfa-syncorder-front/inner/c1/f06',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    }
  ],
  'electric': [
    {
      id: 'bill-query',
      name: '账单查询',
      url: '/emss-bia-bill-front/member/c18/f01',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'daily-electric',
      name: '户号日电费电量',
      url: '/emss-bia-bill-front/member/c11/f01',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'monthly-electric',
      name: '户号月电费电量',
      url: '/emss-bia-bill-front/member/c4/f01',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'homepage-bill',
      name: '首页账单电费电量',
      url: '/emss-bia-bill-front/member/c4/f07',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    }
  ],
  'account': [
    {
      id: 'account-list',
      name: '户号列表',
      url: '/emss-eaa-individuation-front/member/c1/f01',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'archive-query',
      name: '档案查询',
      url: '/emss-eaa-individuation-front/member/c1/f02',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    }
  ],
  'balance': [
    {
      id: 'homepage-balance',
      name: '首页余额',
      url: '/emss-eaa-individuation-front/member/c2/f01',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    }
  ],
  'user': [
    {
      id: 'user-register',
      name: '用户注册',
      url: '/emss-eaa-user-front/member/c1/f01',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'user-login',
      name: '用户登录',
      url: '/emss-eaa-user-front/member/c1/f02',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'huawei-login',
      name: '华为一键登录',
      url: '/emss-eaa-user-front/member/c1/f03',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'miniapp-login',
      name: '小程序一键登录',
      url: '/emss-eaa-user-front/member/c1/f04',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'phone-change',
      name: '手机号变更',
      url: '/emss-eaa-user-front/member/c2/f01',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    }
  ],
  'homepage': [
    {
      id: 'booth-group',
      name: '展台组',
      url: '/emss-eaa-homepage-front/member/c1/f01',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'top-microapp',
      name: '展台接口首页顶部微应用',
      url: '/emss-eaa-homepage-front/member/c1/f02',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'homepage-popup',
      name: '首页弹窗',
      url: '/emss-eaa-homepage-front/member/c1/f03',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    }
  ],
  'miniapp': [
    {
      id: 'platform-auth',
      name: '能力开放平台认证',
      url: '/emss-eaa-miniapp-front/member/c1/f01',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'platform-token',
      name: '获取能力开放平台token',
      url: '/emss-eaa-miniapp-front/member/c1/f02',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'account-decrypt',
      name: '户号解密',
      url: '/emss-eaa-miniapp-front/member/c2/f01',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'delete-account',
      name: '户号列表删除户号',
      url: '/emss-eaa-miniapp-front/member/c2/f02',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'query-assets',
      name: '查询用户资产',
      url: '/emss-eaa-miniapp-front/member/c3/f01',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'confirm-page',
      name: '户号列表跳转确认页面',
      url: '/emss-eaa-miniapp-front/member/c3/f02',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'alipay-balance',
      name: '支付宝生活缴费查询余额',
      url: '/emss-eaa-miniapp-front/member/c4/f01',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'miniapp-order',
      name: '小程序下单',
      url: '/emss-eaa-miniapp-front/member/c4/f02',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'wechat-bill',
      name: '微信小程序账单查询',
      url: '/emss-eaa-miniapp-front/member/c4/f03',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    }
  ],
  'other': [
    {
      id: 'real-name-query',
      name: '实名认证查询',
      url: '/emss-eaa-other-front/member/c1/f01',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'third-party-auth',
      name: '三方实名认证',
      url: '/emss-eaa-other-front/member/c1/f02',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'service-record',
      name: '服务记录查询',
      url: '/emss-eaa-other-front/member/c2/f01',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'service-rating',
      name: '服务评价',
      url: '/emss-eaa-other-front/member/c2/f02',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'e-invoice',
      name: '电子发票查询',
      url: '/emss-eaa-other-front/member/c3/f01',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'task-list',
      name: '任务列表',
      url: '/emss-eaa-other-front/member/c3/f02',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'task-complete',
      name: '任务完成',
      url: '/emss-eaa-other-front/member/c3/f03',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    },
    {
      id: 'user-signin',
      name: '用户签到',
      url: '/emss-eaa-other-front/member/c4/f01',
      isError: false,
      metrics: {
        time: 106,
        successRate: 100,
        tps: 36,
        baseline: {
          time: 100,
          successRate: 99.9,
          tps: 40
        }
      }
    }
  ]
}; 