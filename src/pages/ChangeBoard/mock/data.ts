const apps = [
  '用户中心前台服务',
  '用户中心中台服务',
  '用户中心token认证服务',
  '用户中心户号绑定服务',
  '用户中心实名服务',
  '用户中心数据服务',
  '用户中心档案查询服务',
  '账单中心余额查询服务',
  '账单中心账单查询服务',
  '支付中心前台服务',
  '支付中心中台服务',
  '支付中心数据服务',
  '订单中心前台服务',
  '订单中心中台服务',
  '订单中心数据服务',
  '营销中心前台服务',
  '营销中心中台服务',
  '营销中心数据服务',
  '风控中心策略分发服务',
  '风控中心规则校验服务',
  '风控中心策略决策服务'
];

export const mockChangeData = Array(20).fill(null).map(() => ({
  time: new Date().toLocaleTimeString(),
  appName: apps[Math.floor(Math.random() * apps.length)],
  status: Math.random() > 0.3 ? 'success' : 'pending'
})); 