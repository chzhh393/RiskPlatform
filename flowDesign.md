# 风险监控平台拓扑图设计文档

## 1. 链路拓扑图

### 1.1 整体布局
- 背景色使用深蓝色 (#0D1529)
- 节点从左到右布局，表示调用关系
- 右上角显示状态说明图例
- 页面高度自适应，最小高度为视口高度减去顶部导航栏

### 1.2 节点样式
- 宽度高度自适应
- 圆角: 4px
- 显示四个核心指标（带基线值）：
  * 净耗时: 实际值/基线值 ms
  * 成功率: 实际值/基线值 %
  * 流量: 实际值/基线值 tps
  * 饱和度: 实际值/基线值 %
- 底部显示三个组件指标图标（数据库/MQ/缓存）
- 字体大小：
  * 标题：16px，加粗
  * 指标：12px

### 1.3 指标显示规则
- 指标标签使用白色
- 指标值根据与基线的比较显示不同颜色：
  * 绿色 (#52c41a)：健康（≤120%基线）
  * 橙色 (#faad14)：警告（120-150%基线）
  * 红色 (#ff4d4f)：瓶颈（>150%基线）

## 2. 节点拓扑图

### 2.1 业务入口节点
- 背景色选项：
  * #597EF7 (带紫调的蓝色)
- 宽度: 180px
- 高度: 100px
- 显示三个核心指标（带基线值）：
  * 耗时: 实际值/基线值 ms
  * 成功率: 实际值/基线值 %
  * 流量: 实际值/基线值 tps
- 指标值根据与基线的比较显示不同颜色
- 不显示组件图标
- 显示核心风险指标和故障数
- 健康指标显示为绿色
- 风险指标显示为黄色
- 故障数显示为红色


### 2.2 应用服务节点
- 使用深蓝色背景 (#213559)
- 宽度: 240px
- 高度: 140px
- 蓝色边框 (#1890ff)
- 显示四个核心指标
- 健康指标显示为绿色
- 底部显示组件图标

### 2.3 组件图标
- 位于核心指标下方
- 三种类型：DB、MQ、缓存
- 状态颜色：
  * 健康：绿色
  * 异常：红色
  * 未使用：灰色(45%透明度)
- 圆形背景 + 矩形边框
### 2.4核心风险指标：
  * 抖动：
  * 限流：
  * 性能：
  * 有风险时显示黄色
- 故障数：
  * 格式：故X（X为故障数）
  * 有故障时显示红色

## 3. 通用规范

### 3.1 连线样式
- 颜色：#1890ff
- 线宽：1.5px
- 带箭头
- 使用贝塞尔曲线

### 3.2 交互要求
- 节点位置固定
- 保持合适间距
- 避免重叠
- 文字清晰可见

## 4. 数据结构
```typescript
interface NodeMetrics {
  responseTime: number;
  successRate: number;
  tps: number;
  saturation: number;
  baseline: {
    responseTime: number;
    successRate: number;
    tps: number;
    saturation: number;
  };
}

interface ComponentStatus {
  status: 'healthy' | 'error' | 'unused';
  risks: {
    jitter?: boolean;    // 抖动
    limiting?: boolean;  // 限流
    performance?: boolean; // 性能
  };
  faultCount: number;   // 故障数
}

interface TopologyNode {
  id: string;
  name: string;
  metrics: NodeMetrics;
  icons?: string[];  // ['db', 'mq', 'cache']
  iconStatus?: Record<string, ComponentStatus>;
}

interface TopologyEdge {
  source: string;
  target: string;
}
``` 