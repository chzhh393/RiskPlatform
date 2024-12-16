export const mockBusinessData = [
  {
    id: 'scenario-1',
    name: '去交费',
    key: 'scenario-1',
    entries: [
      { 
        id: 'entry-6', 
        title: '欠费查询', 
        key: 'entry-6', 
        level: '核心', 
        httpEntry: '/emss-eaa-payelec-front/member/p1/f01' 
      }
      // ... 其他 entries
    ]
  }
  // ... 其他场景
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

console.log('Current mock/data.ts content:');