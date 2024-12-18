const apps = [
  'scp0001服务连接平台',
  'emss-uia-center-front用户中心前台服务',
  'emss-coc-userinfo-subdomain用户中心中台服务',
  'emss-uia-brace-front用户中心token认证服务',
  'emss-uia-bind-front用户中心户号绑定服务',
  'emss-uia-auth-front用户中心实名服务',
  'emss-coc-drds-data用户中心数据服务',
  'emss-cma-outsidecustomer-front用户中心档案查询服务',
  'osg-scp0005外网穿透服务',
  'osg-scp0006内网穿透服务',
  'emss-cma-withincustomer-inner-front用户中心内网档案查询服务',
  'emss-bia-balance-front账单中心余额查询服务',
  'emss-bia-bill-front账单中心账单查询服务',
  'emss-eaa-payelec-front支付中心前台服务',
  'emss-pmc-payelec-subdomain支付中心中台服务',
  'emss-pmc-oracle-data支付中心数据服务',
  'emss-pfa-syncorder-front订单中心前台服务',
  'emss-odc-drds-data订单中心数据服务',
  'emss-odc-ordercud-subdomain订单中心中台服务',
  'emss-mia-eca-front营销中心前台服务',
  'emss-mac-oracle-data营销中心数据服务',
  'emss-mac-eca-subdomain营销中心中台服务',
  'osg-rm0001风控服务',
  'osg-rm0009风控中心策略分发服务',
  'osg-rm0010风控中心规则校验服务',
  'osg-rm0011风控中心策略决策服务'
];

// 随机从应用列表中选择一些应用来初始化数据
export const mockChangeData = [
  {
    time: '07-27 21时',
    changes: [
      {
        title: `${apps[3]}V2.29.6版本通知`,
        changeTime: '21:00:00',
        count: 1
      }
    ]
  },
  {
    time: '07-27 20时',
    changes: [
      {
        title: apps[0],
        changeTime: '20:05:54',
        count: 1
      },
      {
        title: apps[14],
        changeTime: '20:04:55',
        count: 3
      },
      {
        title: apps[22],
        changeTime: '20:00:12',
        count: 2
      },
      {
        title: apps[8],
        changeTime: '20:00:03',
        count: 1
      }
    ]
  },
  {
    time: '07-27 19时',
    changes: [
      {
        title: apps[12],
        changeTime: '19:59:37',
        count: 4
      },
      {
        title: apps[19],
        changeTime: '19:48:27',
        count: 2
      },
      {
        title: apps[5],
        changeTime: '19:44:45',
        count: 1
      },
      {
        title: apps[25],
        changeTime: '19:32:40',
        count: 7
      }
    ]
  }
]; 