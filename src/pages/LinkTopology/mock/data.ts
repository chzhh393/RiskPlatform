// 把您提供的数据转换成树形结构
export const mockBusinessData = [
  {
    name: '去交费',
    key: 'scenario-1',
    children: [
      { title: '欠费查询', key: 'entry-6', level: '核心', httpEntry: '/emss-eaa-payelec-front/member/p1/f01' },
      { title: '请求结算', key: 'entry-7', level: '核心', httpEntry: '/emss-eaa-payelec-front/member/p3/f03' },
      { title: '提交订单', key: 'entry-8', level: '核心', httpEntry: '/emss-eaa-payelec-front/member/p2/f01' },
      { title: '支付完成', key: 'entry-9', level: '核心', httpEntry: '/emss-eaa-individuation-front/member/c2/f01' },
      { title: '支付结果通知', key: 'entry-10', level: '核心', httpEntry: '/emss-eaa-recharge-front/member/c7/f01' },
      { title: '交费订单同步（销账）', key: 'entry-11', level: '核心', httpEntry: '/emss-pfa-syncorder-front/inner/c1/f06' }
    ]
  },
  {
    name: '注册登录',
    key: 'scenario-2',
    children: [
      { title: '用户注册', key: 'entry-1', level: '核心', httpEntry: '/emss-uia-center-front/member/c9/f02' },
      { title: '用户登录', key: 'entry-2', level: '核心', httpEntry: '/emss-uia-center-front/member/c2/f01' },
      { title: '华为一键登录', key: 'entry-3', level: '核心', httpEntry: '/emss-uia-center-front/member/c2/f05' },
      { title: '小程序一键登录', key: 'entry-4', level: '核心', httpEntry: '/emss-uia-channel-front/member/uc13/c44/f01' }
    ]
  },
  {
    name: '账户与安全',
    key: 'scenario-3',
    children: [
      { title: '手机号变更', key: 'entry-5', level: '核心', httpEntry: '/emss-uia-center-front/member/c9/f07' }
    ]
  },
  {
    name: '电费余额',
    key: 'scenario-4',
    children: [
      { title: '首页余额', key: 'entry-12', level: '核心', httpEntry: '/emss-bia-balance-front/member/c16/f01' }
    ]
  },
  {
    name: '电费电量',
    key: 'scenario-5',
    children: [
      { title: '账单查询', key: 'entry-13', level: '核心', httpEntry: '/emss-bia-bill-front/member/c18/f01' },
      { title: '户号日电费电量', key: 'entry-14', level: '核心', httpEntry: '/emss-bia-bill-front/member/c11/f01' },
      { title: '户号月电费电量', key: 'entry-15', level: '核心', httpEntry: '/emss-bia-bill-front/member/c4/f01' },
      { title: '首页账单电费电量', key: 'entry-16', level: '核心', httpEntry: '/emss-bia-bill-front/member/c4/f07' }
    ]
  },
  {
    name: '主交互（首页）',
    key: 'scenario-6',
    children: [
      { title: '展台组', key: 'entry-17', level: '核心', httpEntry: '/emss-pfa-pro-front/app_api/new/selectExhibitionServiceWithCategoryIdByCategoryId' },
      { title: '展台接口首页顶部微应用', key: 'entry-18', level: '核心', httpEntry: '/emss-pfa-pro-front/app_api/new/selectServiceWithExhibition' },
      { title: '首页弹窗', key: 'entry-19', level: '核心', httpEntry: '/emss-pfa-pro-front/app_api/selectServiceWithExhibition' }
    ]
  },
  {
    name: '实名认证',
    key: 'scenario-7',
    children: [
      { title: '实名认证查询', key: 'entry-20', level: '核心', httpEntry: '/emss-uia-auth-front/member/c11/f01' },
      { title: '三方实名认证', key: 'entry-21', level: '核心', httpEntry: '/emss-uia-auth-front/member/c18/f05' }
    ]
  },
  {
    name: '户号管理',
    key: 'scenario-8',
    children: [
      { title: '户号列表', key: 'entry-22', level: '核心', httpEntry: '/emss-uia-bind-front/member/uc15/c1/f02' },
      { title: '档案查询', key: 'entry-23', level: '核心', httpEntry: '/emss-cma-outsidecustomer-front/member/uc02/uc2/f61' }
    ]
  },
  {
    name: '服务记录',
    key: 'scenario-9',
    children: [
      { title: '服务记录查询', key: 'entry-24', level: '核心', httpEntry: '/emss-uia-service-front/member/uc04/c2/f02' },
      { title: '服务评价', key: 'entry-25', level: '核心', httpEntry: '/emss-pfa-oper-front/operator/evaluation/f001' }
    ]
  },
  {
    name: '电子发票',
    key: 'scenario-10',
    children: [
      { title: '电子发票查询', key: 'entry-26', level: '核心', httpEntry: '/emss-bia-invoice-front/invoice/queryeleinvoicelistnew' }
    ]
  },
  {
    name: '会员中心',
    key: 'scenario-11',
    children: [
      { title: '任务列表', key: 'entry-27', level: '核心', httpEntry: '/emss-pfa-menmber-front/open/c150/f92' },
      { title: '任务完成', key: 'entry-28', level: '核心', httpEntry: '/emss-pfa-menmber-front/inner/task/f102' }
    ]
  },
  {
    name: '签到',
    key: 'scenario-12',
    children: [
      { title: '用户签到', key: 'entry-29', level: '核心', httpEntry: '/osg-omgmt1042/member/m1/0103514' }
    ]
  },
  {
    name: '停电信息',
    key: 'scenario-13',
    children: [
      { title: '停电信息通知', key: 'entry-30', level: '非核心', httpEntry: '/emss-pfa-homepage-front/member/c8/f04' }
    ]
  },
  {
    name: '活动',
    key: 'scenario-14',
    children: [
      { title: '积分立返', key: 'entry-31', level: '非核心', httpEntry: '/emss-mia-eca-front/member/c1/f08' },
      { title: '限时领券', key: 'entry-32', level: '非核心', httpEntry: '/emss-mia-mg-front/member/c1/f10' }
    ]
  },
  {
    name: '站内信',
    key: 'scenario-15',
    children: [
      { title: '站内信推送', key: 'entry-33', level: '非核心', httpEntry: '/outer/c001/f01' }
    ]
  },
  {
    name: '小程序',
    key: 'scenario-16',
    children: [
      { title: '能力开放平台认证', key: 'entry-34', level: '非核心', httpEntry: '/oauth2/oauth/authorize' },
      { title: '获取能力开放平台token', key: 'entry-35', level: '非核心', httpEntry: '/oauth/getMiniPGToken' },
      { title: '户号解密', key: 'entry-36', level: '非核心', httpEntry: '/osg-open-oc0001/member/arg/020380001' },
      { title: '户号列表删除户号', key: 'entry-37', level: '非核心', httpEntry: '/osg-open-p0001/member/c13/f01' },
      { title: '查询用户资产', key: 'entry-38', level: '非核心', httpEntry: '/osg-open-p0001/member/c5/f22' },
      { title: '户号列表跳转确认页面', key: 'entry-39', level: '非核心', httpEntry: '/osg-open-p0001/member/c15/f02' },
      { title: '支付宝生活缴费查询余额', key: 'entry-40', level: '非核心', httpEntry: '/osg-open-bc0001/member/c05/f01' },
      { title: '小程序下单', key: 'entry-41', level: '非核心', httpEntry: '/osg-open-p0001/member/c5/f23' },
      { title: '微信小程序账单查询', key: 'entry-42', level: '非核心', httpEntry: '/emss-bia-bill-front/member/c31/f01' }
    ]
  }
];

// 链路拓扑数据
export const mockTopologyData = {
  'entry-6': `graph LR
    A["欠费查询<br/><span style='font-size:10px;color:#666'>/emss-eaa-payelec-front/member/p1/f01</span>"]:::entry --> B["osg-scp0001<br/><span style='font-size:10px;color:#666'>
    响应时间P50: 135ms (基线: 未覆盖)<br/>
    响应时间P90: 735ms (基线: 未覆盖)<br/>
    净耗时: 23ms (基线: 未覆盖)<br/>
    错误率: 99.98% (基线: 未覆盖)<br/>
    吞吐量: 21TPM (基线: 未覆盖)<br/>
    CPU: 31% (基线: 未覆盖)<br/>
    内存: 55% (基线: 未覆盖)<br/>
    磁盘: 45% (基线: 未覆盖)<br/>
    网络: 76% (基线: 未覆盖)<br/>
    线程池: 未覆盖 (基线: 未覆盖)<br/>
    SQL响应时间P50: 未覆盖 (基线: 未覆盖)<br/>
    SQL响应时间P90: 未覆盖 (基线: 未覆盖)<br/>
    SQL错误率: 未覆盖 (基线: 未覆盖)<br/>
    SQL吞吐量: 未覆盖 (基线: 未覆盖)<br/>
    数据库连接池: 未覆盖 (基线: 未覆盖)<br/>
    缓存连接池: 未覆盖 (基线: 未覆盖)
    </span>"]
    B --> C["emss-eaa-payelec-front<br/><span style='font-size:10px;color:#666'>
    响应时间P50: 89ms (基线: 100ms)<br/>
    响应时间P90: 456ms (基线: 500ms)<br/>
    净耗时: 45ms (基线: 50ms)<br/>
    错误率: 99.95% (基线: 99.9%)<br/>
    吞吐量: 35TPM (基线: 30TPM)<br/>
    CPU: 45% (基线: 60%)<br/>
    内存: 62% (基线: 70%)<br/>
    磁盘: 38% (基线: 50%)<br/>
    网络: 58% (基线: 65%)<br/>
    线程池: 42% (基线: 50%)<br/>
    SQL响应时间P50: 15ms (基线: 20ms)<br/>
    SQL响应时间P90: 68ms (基线: 80ms)<br/>
    SQL错误率: 99.99% (基线: 99.95%)<br/>
    SQL吞吐量: 150TPM (基线: 120TPM)<br/>
    数据库连接池: 35% (基线: 45%)<br/>
    缓存连接池: 28% (基线: 40%)
    </span>"]
    D["emss-eaa-asset-front<br/><span style='font-size:10px;color:#666'>
    响应时间P50: 65ms (基线: 80ms)<br/>
    响应时间P90: 325ms (基线: 400ms)<br/>
    净耗时: 32ms (基线: 40ms)<br/>
    错误率: 99.97% (基线: 99.9%)<br/>
    吞吐量: 42TPM (基线: 35TPM)<br/>
    CPU: 38% (基线: 55%)<br/>
    内存: 58% (基线: 65%)<br/>
    磁盘: 42% (基线: 45%)<br/>
    网络: 52% (基线: 60%)<br/>
    线程池: 35% (基线: 45%)<br/>
    SQL响应时间P50: 12ms (基线: 15ms)<br/>
    SQL响应时间P90: 58ms (基线: 70ms)<br/>
    SQL错误率: 99.98% (基线: 99.95%)<br/>
    SQL吞吐量: 180TPM (基线: 150TPM)<br/>
    数据库连接池: 32% (基线: 40%)<br/>
    缓存连接池: 25% (基线: 35%)
    </span>"] --> E["emss-pmc-oracle-data<br/><span style='font-size:10px;color:#666'>
    响应时间P50: 25ms (基线: 30ms)<br/>
    响应时间P90: 125ms (基线: 150ms)<br/>
    错误率: 99.99% (基线: 99.95%)<br/>
    吞吐量: 280TPM (基线: 250TPM)<br/>
    CPU: 42% (基线: 50%)<br/>
    内存: 65% (基线: 70%)<br/>
    磁盘: 58% (基线: 60%)<br/>
    数据库连接池: 48% (基线: 55%)
    </span>"]
    C --> D
    C --> F["emss-mia-eca-front<br/><span style='font-size:10px;color:#666'>
    响应时间P50: 72ms (基线: 85ms)<br/>
    响应时间P90: 358ms (基线: 420ms)<br/>
    净耗时: 38ms (基线: 45ms)<br/>
    错误率: 99.96% (基线: 99.9%)<br/>
    吞吐量: 38TPM (基线: 32TPM)
    </span>"]
    C --> E
    C --> G["emss-pmc-payelec-subdomain<br/><span style='font-size:10px;color:#666'>
    响应时间P50: 48ms (基线: 60ms)<br/>
    响应时间P90: 245ms (基线: 300ms)<br/>
    净耗时: 28ms (基线: 35ms)<br/>
    错误率: 99.97% (基线: 99.9%)<br/>
    吞吐量: 45TPM (基线: 40TPM)
    </span>"]
    C --> H["emss-uia-brace-front<br/><span style='font-size:10px;color:#666'>
    响应时间P50: 55ms (基线: 65ms)<br/>
    响应时间P90: 285ms (基线: 350ms)<br/>
    净耗时: 32ms (基线: 38ms)<br/>
    错误率: 99.96% (基线: 99.9%)<br/>
    吞吐量: 40TPM (基线: 35TPM)
    </span>"]
    F --> I["emss-mac-oracle-data<br/><span style='font-size:10px;color:#666'>
    响应时间P50: 22ms (基线: 28ms)<br/>
    响应时间P90: 115ms (基线: 140ms)<br/>
    错误率: 99.99% (基线: 99.95%)<br/>
    吞吐量: 260TPM (基线: 230TPM)<br/>
    CPU: 38% (基线: 45%)<br/>
    内存: 62% (基线: 65%)<br/>
    磁盘: 52% (基线: 55%)<br/>
    数据库连接池: 45% (基线: 50%)
    </span>"]
    
    linkStyle default stroke-width:1.5
    
    style A fill:#e6f7ff,stroke:#1890ff,width:220px,rx:4,ry:4
    style B fill:#fff,stroke:#1890ff,width:320px,rx:4,ry:4
    style C fill:#fff,stroke:#1890ff,width:320px,rx:4,ry:4
    style D fill:#fff,stroke:#1890ff,width:320px,rx:4,ry:4
    style E fill:#fff,stroke:#1890ff,width:320px,rx:4,ry:4
    style F fill:#fff,stroke:#1890ff,width:320px,rx:4,ry:4
    style G fill:#fff,stroke:#1890ff,width:320px,rx:4,ry:4
    style H fill:#fff,stroke:#1890ff,width:320px,rx:4,ry:4
    style I fill:#fff,stroke:#1890ff,width:320px,rx:4,ry:4

    classDef entry fill:#e6f7ff,stroke:#1890ff,rx:4,ry:4`,

  'entry-8': `graph LR
    A["提交订单<br/><span style='font-size:10px;color:#666'>/emss-eaa-payelec-front/member/p2/f01</span>"]:::entry --> B["osg-scp0001<br/><span style='font-size:10px;color:#666'>
    响应时间P50: 135ms (基线: 未覆盖)<br/>
    响应时间P90: 735ms (基线: 未覆盖)<br/>
    净耗时: 23ms (基线: 未覆盖)<br/>
    错误率: 99.98% (基线: 未覆盖)<br/>
    吞吐量: 21TPM (基线: 未覆盖)<br/>
    CPU: 31% (基线: 未覆盖)<br/>
    内存: 55% (基线: 未覆盖)<br/>
    磁盘: 45% (基线: 未覆盖)<br/>
    网络: 76% (基线: 未覆盖)<br/>
    线程池: 未覆盖 (基线: 未覆盖)<br/>
    SQL响应时间P50: 未覆盖 (基线: 未覆盖)<br/>
    SQL响应时间P90: 未覆盖 (基线: 未覆盖)<br/>
    SQL错误率: 未覆盖 (基线: 未覆盖)<br/>
    SQL吞吐量: 未覆盖 (基线: 未覆盖)<br/>
    数据库连接池: 未覆盖 (基线: 未覆盖)<br/>
    缓存连接池: 未覆盖 (基线: 未覆盖)
    </span>"]
    B --> C["emss-eaa-payelec-front"]
    C --> D["emss-pfa-syncorder-front"]
    C --> E["emss-pmc-oracle-data"]
    C --> F["emss-pmc-payelec-subdomain"]
    C --> G["emss-uia-brace-front"]
    D --> H["emss-odc-drds-data"]
    D --> I["emss-odc-ordercud-subdomain"]
    
    style A fill:#e6f7ff,stroke:#1890ff,width:220px,rx:4,ry:4
    style B fill:#fff,stroke:#1890ff,width:320px,rx:4,ry:4
    style C fill:#fff,stroke:#1890ff,width:180px,rx:4,ry:4
    style D fill:#fff,stroke:#1890ff,width:160px,rx:4,ry:4
    style E fill:#fff,stroke:#1890ff,width:160px,rx:4,ry:4
    style F fill:#fff,stroke:#1890ff,width:200px,rx:4,ry:4
    style G fill:#fff,stroke:#1890ff,width:160px,rx:4,ry:4
    style H fill:#fff,stroke:#1890ff,width:160px,rx:4,ry:4
    style I fill:#fff,stroke:#1890ff,width:180px,rx:4,ry:4

    classDef entry fill:#e6f7ff,stroke:#1890ff,rx:4,ry:4`,

  'entry-7': `graph LR
    A["请求结算<br/><span style='font-size:10px;color:#666'>/emss-eaa-payelec-front/member/p3/f03</span>"]:::entry --> B["osg-scp0001"]
    B --> C["emss-eaa-payelec-front"]
    D["emss-eaa-asset-front"] --> E["emss-pmc-oracle-data"]
    D --> F["emss-uia-brace-front"]
    C --> D
    C --> E
    C --> F
    
    style A fill:#e6f7ff,stroke:#1890ff,width:220px,rx:4,ry:4
    style B fill:#fff,stroke:#1890ff,width:120px,rx:4,ry:4
    style C fill:#fff,stroke:#1890ff,width:180px,rx:4,ry:4
    style D fill:#fff,stroke:#1890ff,width:160px,rx:4,ry:4
    style E fill:#fff,stroke:#1890ff,width:160px,rx:4,ry:4
    style F fill:#fff,stroke:#1890ff,width:160px,rx:4,ry:4

    classDef entry fill:#e6f7ff,stroke:#1890ff,rx:4,ry:4`,

  'entry-10': `graph LR
    A["支付结果通知<br/><span style='font-size:10px;color:#666'>/emss-eaa-recharge-front/member/c7/f01</span>"]:::entry --> B["osg-scp0001<br/><span style='font-size:10px;color:#666'>
    响应时间P50: 135ms (基线: 未覆盖)<br/>
    响应时间P90: 735ms (基线: 未覆盖)<br/>
    净耗时: 23ms (基线: 未覆盖)<br/>
    错误率: 99.98% (基线: 未覆盖)<br/>
    吞吐量: 21TPM (基线: 未覆盖)<br/>
    CPU: 31% (基线: 未覆盖)<br/>
    内存: 55% (基线: 未覆盖)<br/>
    磁盘: 45% (基线: 未覆盖)<br/>
    网络: 76% (基线: 未覆盖)<br/>
    线程池: 未覆盖 (基线: 未覆盖)<br/>
    SQL响应时间P50: 未覆盖 (基线: 未覆盖)<br/>
    SQL响应时间P90: 未覆盖 (基线: 未覆盖)<br/>
    SQL错误率: 未覆盖 (基线: 未覆盖)<br/>
    SQL吞吐量: 未覆盖 (基线: 未覆盖)<br/>
    数据库连接池: 未覆盖 (基线: 未覆盖)<br/>
    缓存连接池: 未覆盖 (基线: 未覆盖)
    </span>"]
    B --> C["emss-eaa-recharge-front"]
    C --> C
    C --> D["emss-pfa-syncorder-front"]
    C --> E["emss-pmc-oracle-data"]
    C --> F["emss-pmc-payelec-subdomain"]
    C --> G["emss-pmc-recharge-subdomain"]
    C --> H["emss-uia-brace-front"]
    I["emss-odc-ordersync-subdomain"] --> J["emss-odc-drds-data"]
    D --> J
    D --> I
    H --> K["emss-coc-drds-data"]
    
    style A fill:#e6f7ff,stroke:#1890ff,width:220px,rx:4,ry:4
    style B fill:#fff,stroke:#1890ff,width:320px,rx:4,ry:4
    style C fill:#fff,stroke:#1890ff,width:180px,rx:4,ry:4
    style D fill:#fff,stroke:#1890ff,width:180px,rx:4,ry:4
    style E fill:#fff,stroke:#1890ff,width:160px,rx:4,ry:4
    style F fill:#fff,stroke:#1890ff,width:200px,rx:4,ry:4
    style G fill:#fff,stroke:#1890ff,width:200px,rx:4,ry:4
    style H fill:#fff,stroke:#1890ff,width:160px,rx:4,ry:4
    style I fill:#fff,stroke:#1890ff,width:200px,rx:4,ry:4
    style J fill:#fff,stroke:#1890ff,width:160px,rx:4,ry:4
    style K fill:#fff,stroke:#1890ff,width:160px,rx:4,ry:4

    classDef entry fill:#e6f7ff,stroke:#1890ff,rx:4,ry:4`,

  'entry-9': `graph LR
    A["支付完成<br/><span style='font-size:10px;color:#666'>/emss-eaa-individuation-front/member/c2/f01</span>"]:::entry --> B["osg-scp0001<br/><span style='font-size:10px;color:#666'>
    响应时间P50: 135ms (基线: 未覆盖)<br/>
    响应时间P90: 735ms (基线: 未覆盖)<br/>
    净耗时: 23ms (基线: 未覆盖)<br/>
    错误率: 99.98% (基线: 未覆盖)<br/>
    吞吐量: 21TPM (基线: 未覆盖)<br/>
    CPU: 31% (基线: 未覆盖)<br/>
    内存: 55% (基线: 未覆盖)<br/>
    磁盘: 45% (基线: 未覆盖)<br/>
    网络: 76% (基线: 未覆盖)<br/>
    线程池: 未覆盖 (基线: 未覆盖)<br/>
    SQL响应时间P50: 未覆盖 (基线: 未覆盖)<br/>
    SQL响应时间P90: 未覆盖 (基线: 未覆盖)<br/>
    SQL错误率: 未覆盖 (基线: 未覆盖)<br/>
    SQL吞吐量: 未覆盖 (基线: 未覆盖)<br/>
    数据库连接池: 未覆盖 (基线: 未覆盖)<br/>
    缓存连接池: 未覆盖 (基线: 未覆盖)
    </span>"]
    B --> C["emss-eaa-individuation-front"]
    C --> D["emss-pfa-syncorder-front"]
    C --> E["emss-pmc-oracle-data"]
    C --> F["emss-pmc-payelec-subdomain"]
    G["emss-odc-ordersync-subdomain"] --> H["emss-odc-drds-data"]
    D --> H
    D --> G
    
    style A fill:#e6f7ff,stroke:#1890ff,width:220px,rx:4,ry:4
    style B fill:#fff,stroke:#1890ff,width:320px,rx:4,ry:4
    style C fill:#fff,stroke:#1890ff,width:200px,rx:4,ry:4
    style D fill:#fff,stroke:#1890ff,width:180px,rx:4,ry:4
    style E fill:#fff,stroke:#1890ff,width:160px,rx:4,ry:4
    style F fill:#fff,stroke:#1890ff,width:200px,rx:4,ry:4
    style G fill:#fff,stroke:#1890ff,width:200px,rx:4,ry:4
    style H fill:#fff,stroke:#1890ff,width:160px,rx:4,ry:4

    classDef entry fill:#e6f7ff,stroke:#1890ff,rx:4,ry:4`
}; 