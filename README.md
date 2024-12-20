# 风险监控平台

## 技术架构

### 前端技术栈
- React
- TypeScript
- SVG (原生操作)
- Less
- Ant Design

### 主要功能模块
1. 链路拓扑图
   - 展示服务调用关系
   - 监控服务健康状态
   - 显示性能指标

2. 节点拓扑图
   - 展示业务入口
   - 监控应用服务
   - 追踪组件状态

## 数据结构

### 节点定义

## 布局算法
- 使用BFS算法计算节点层级
- 固定业务入口节点位置
- 自动计算服务节点位置
- 避免节点重叠

## 性能优化
- SVG元素复用
- 按需渲染
- 布局计算优化

## 开发指南
1. 安装依赖
bash
npm install
2. 启动开发服务器
bash:RiskPlatform/README.md
npm run dev
3. 构建生产版本
bash
npm run build
