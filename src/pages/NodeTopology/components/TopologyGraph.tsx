import React, { useEffect, useRef } from 'react';
import { TopologyNode } from '../index';
import '../styles.less';
import * as d3 from 'd3';

interface ComponentStatus {
  status: 'healthy' | 'error' | 'unused';
  risks?: {
    jitter?: boolean;
    limiting?: boolean;
    performance?: boolean;
  };
  faultCount?: number;
}

interface TopologyGraphProps {
  nodes: TopologyNode[];
  edges: { source: string; target: string; }[];
}

const colors = {
  healthy: '#52c41a',      // 绿色 - 健康指标
  warning: '#faad14',      // 黄色 - 风险指标
  error: '#ff4d4f',        // 红色 - 故障数
  text: {
    light: '#ffffff',      // 白色文本
  },
  background: {
    entry: '#597EF7',      // 修改入口节点背景色为带紫调的蓝色
    service: '#213559'     // 服务节点背景色保持不变
  },
  border: {
    normal: 'rgba(24, 144, 255, 0.3)',
    light: 'rgba(255, 255, 255, 0.3)'
  }
};

// 定义节点内部布局
interface NodeLayout {
  padding: number;
  titleHeight: number;
  metricsHeight: number;
  componentIconsHeight: number;
  statusHeight: number;
  spacing: number;
}

// 修改字体大小常量
const fontSizes = {
  title: '18',             // 节点标题，原来是16
  metrics: '14',           // 核心指标，原来是12
  icons: '13',            // 组件图标，原来是12
  status: '13'            // 风险指标和故障数，原来是12
};

const calculateNodeDimensions = (node: TopologyNode): { width: number; height: number; layout: NodeLayout } => {
  const layout: NodeLayout = {
    padding: 20,
    titleHeight: 30,
    metricsHeight: node.metrics.saturation !== undefined ? 100 : 80,
    componentIconsHeight: 30,
    statusHeight: 30,
    spacing: 10
  };

  const width = node.type === 'entry' ? 240 : 340;  // 保持宽度不变
  const height = node.type === 'entry' 
    ? 140                 // 入口节点高度
    : 200;               // 服务节点高度

  return { width, height, layout };
};

const getMetricColor = (value: number, baseline: number, isEntry: boolean) => {
  const ratio = value / baseline;
  if (ratio > 1.2) {
    return colors.error;       // 红色
  } else if (ratio > 1.1) {
    return colors.warning;     // 黄色
  } else {
    return colors.healthy;     // 绿色
  }
};

// 添加组件状态颜色
const componentColors = {
  healthy: '#52c41a',      // 健康：绿色
  error: '#ff4d4f',        // 异常：红色
  unused: 'rgba(255, 255, 255, 0.45)'  // 未使用：灰色(45%透明度)
};

const TopologyGraph: React.FC<TopologyGraphProps> = ({ nodes, edges }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !nodes.length) return;

    const svg = svgRef.current;
    const containerWidth = svg.parentElement?.clientWidth || 1200;
    const containerHeight = svg.parentElement?.clientHeight || 800;
    
    svg.setAttribute('width', containerWidth.toString());
    svg.setAttribute('height', containerHeight.toString());
    svg.setAttribute('viewBox', `0 0 ${containerWidth} ${containerHeight}`);
    svg.innerHTML = '';

    // Add arrow marker
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5"
        markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.45)"/>
      </marker>
    `;
    svg.appendChild(defs);

    // Initialize levels for all nodes
    const levels: { [key: string]: number } = {};
    nodes.forEach(node => {
      levels[node.id] = -1; // Initialize all nodes with -1
    });

    // Find entry nodes and start nodes without incoming edges
    const startNodes = nodes.filter(node => {
      const hasIncoming = edges.some(edge => edge.target === node.id);
      return !hasIncoming || node.type === 'entry';
    });

    // Set level 0 for start nodes
    startNodes.forEach(node => {
      levels[node.id] = 0;
    });

    // Calculate levels using BFS
    let changed = true;
    while (changed) {
      changed = false;
      edges.forEach(edge => {
        const sourceLevel = levels[edge.source];
        const targetLevel = levels[edge.target];
        
        if (sourceLevel !== -1 && (targetLevel === -1 || targetLevel <= sourceLevel)) {
          levels[edge.target] = sourceLevel + 1;
          changed = true;
        }
      });
    }

    // Ensure all nodes have a valid level
    Object.keys(levels).forEach(nodeId => {
      if (levels[nodeId] === -1) {
        levels[nodeId] = 0; // Place disconnected nodes at level 0
      }
    });

    // Calculate node positions by level
    const levelNodes: { [key: number]: string[] } = {};
    Object.entries(levels).forEach(([nodeId, level]) => {
      if (!levelNodes[level]) levelNodes[level] = [];
      levelNodes[level].push(nodeId);
    });

    // 调整布局参数
    const startX = 200;                    // 保持左边距
    const startY = containerHeight / 10;   // 保持顶部边距
    const levelGap = 380;                  // 保持水平间距
    const verticalGap = 220;               // 减小垂直间距，让节点更紧凑

    // 为业务入口节点设置特定位置
    const entryPositions: Record<string, { level: number; index: number }> = {
      'pay-complete': { level: 0, index: 0 },
      'pay-notify': { level: 0, index: 1 },
      'debt-query': { level: 0, index: 2 },
      'submit-order': { level: 0, index: 3 },
      'request-settle': { level: 0, index: 4 }  // 最后一个入口节点
    };

    // Create node map for edge drawing
    const nodePositions = new Map();

    // Draw nodes
    nodes.forEach(node => {
      const { width, height, layout } = calculateNodeDimensions(node);
      
      const level = levels[node.id];
      let indexInLevel = levelNodes[level].indexOf(node.id);
      
      // 如果是入口节点，使用预定义位置
      if (node.type === 'entry' && entryPositions[node.id]) {
        indexInLevel = entryPositions[node.id].index;
      }
      
      const x = startX + level * levelGap;
      const y = startY + indexInLevel * verticalGap;

      nodePositions.set(node.id, { x, y, width, height });

      const nodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      nodeGroup.setAttribute('transform', `translate(${x},${y})`);

      // Node background
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('width', width.toString());
      rect.setAttribute('height', height.toString());
      rect.setAttribute('x', `-${width/2}`);
      rect.setAttribute('y', `-${height/2}`);
      rect.setAttribute('rx', '4');
      rect.setAttribute('fill', node.type === 'entry' ? colors.background.entry : colors.background.service);
      if (node.type !== 'entry') {
        rect.setAttribute('stroke', '#1890ff');
        rect.setAttribute('stroke-width', '1');
      }
      nodeGroup.appendChild(rect);

      // Node title
      const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      title.setAttribute('x', '0');
      title.setAttribute('y', `-${height/2 - 25}`);
      title.setAttribute('text-anchor', 'middle');
      title.setAttribute('fill', '#fff');
      title.setAttribute('font-size', fontSizes.title);  // 增大标题字体
      title.setAttribute('font-weight', 'bold');
      title.textContent = node.name;
      nodeGroup.appendChild(title);

      // Node metrics
      const iconStartX = -width/2 + 50;  // 计算图标起始位置和间距
      const iconGap = 48;
      
      // 调整核心指标位置，与图标左对齐
      const metrics = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      metrics.setAttribute('x', `${iconStartX}`);
      metrics.setAttribute('y', `-${height/2 - 45}`);

      // 根据节点类型渲染不同的指标
      if (node.type === 'entry') {
        // 入口节点只显示三个核心指标
        metrics.innerHTML = `
          <tspan x="${iconStartX}" dy="0" font-size="${fontSizes.metrics}">
            <tspan fill="#fff">耗时:</tspan>
            <tspan dx="5" fill="${getMetricColor(node.metrics.responseTime, node.metrics.baseline.responseTime)}">
              ${node.metrics.responseTime}/${node.metrics.baseline.responseTime}ms
            </tspan>
          </tspan>
          <tspan x="${iconStartX}" dy="24">  
            <tspan fill="#fff">成功率:</tspan>
            <tspan dx="5" fill="${getMetricColor(node.metrics.successRate, node.metrics.baseline.successRate)}">
              ${node.metrics.successRate}/${node.metrics.baseline.successRate}%
            </tspan>
          </tspan>
          <tspan x="${iconStartX}" dy="24">  
            <tspan fill="#fff">流量:</tspan>
            <tspan dx="5" fill="${getMetricColor(node.metrics.tps, node.metrics.baseline.tps)}">
              ${node.metrics.tps}/${node.metrics.baseline.tps}tps
            </tspan>
          </tspan>
        `;
      } else {
        // 服务节点显示四个核心指标（包括饱和度）
        metrics.innerHTML = `
          <tspan x="${iconStartX}" dy="0" font-size="${fontSizes.metrics}">
            <tspan fill="#fff">净耗时:</tspan>
            <tspan dx="5" fill="${getMetricColor(node.metrics.responseTime, node.metrics.baseline.responseTime)}">
              ${node.metrics.responseTime}/${node.metrics.baseline.responseTime}ms
            </tspan>
          </tspan>
          <tspan x="${iconStartX}" dy="24">  
            <tspan fill="#fff">成功率:</tspan>
            <tspan dx="5" fill="${getMetricColor(node.metrics.successRate, node.metrics.baseline.successRate)}">
              ${node.metrics.successRate}/${node.metrics.baseline.successRate}%
            </tspan>
          </tspan>
          <tspan x="${iconStartX}" dy="24">  
            <tspan fill="#fff">流量:</tspan>
            <tspan dx="5" fill="${getMetricColor(node.metrics.tps, node.metrics.baseline.tps)}">
              ${node.metrics.tps}/${node.metrics.baseline.tps}tps
            </tspan>
          </tspan>
          <tspan x="${iconStartX}" dy="24">
            <tspan fill="#fff">饱和度:</tspan>
            <tspan dx="5" fill="${getMetricColor(node.metrics.saturation, node.metrics.baseline.saturation || 80)}">
              ${node.metrics.saturation}/${node.metrics.baseline.saturation || 80}%
            </tspan>
          </tspan>
        `;
      }
      nodeGroup.appendChild(metrics);

      // 组件图标渲染（只为服务节点）
      if (node.type !== 'entry') {
        const iconY = 35;
        const iconTypes = [
          { id: 'db', text: 'DB' },
          { id: 'mq', text: 'MQ' },
          { id: 'cache', text: '缓存' }
        ];

        iconTypes.forEach((icon, index) => {
          const iconGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          iconGroup.setAttribute('transform', `translate(${iconStartX + index * iconGap}, ${iconY})`);
          
          // 获取组件状态
          const status = node.iconStatus?.[icon.id]?.status || 'unused';
          const iconColor = componentColors[status];
          
          // 组件图标背景
          const iconRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          iconRect.setAttribute('x', '-20');
          iconRect.setAttribute('y', '-10');
          iconRect.setAttribute('width', '40');
          iconRect.setAttribute('height', '20');
          iconRect.setAttribute('rx', '2');
          iconRect.setAttribute('fill', 'none');
          iconRect.setAttribute('stroke', iconColor);  // 使用状态对应的颜色

          // 组件图标文本
          const iconText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          iconText.setAttribute('text-anchor', 'middle');
          iconText.setAttribute('dominant-baseline', 'middle');
          iconText.setAttribute('font-size', fontSizes.icons);
          iconText.setAttribute('fill', iconColor);  // 使用状态对应的颜色
          iconText.textContent = icon.text;

          iconGroup.appendChild(iconRect);
          iconGroup.appendChild(iconText);
          nodeGroup.appendChild(iconGroup);
        });
      }

      // 风险指标和故障数渲染
      const riskY = node.type === 'entry' ? 40 : 75;
      
      // 风险指标渲染
      const riskTypes = [
        { id: 'jitter', text: '抖动' },
        { id: 'limiting', text: '限流' },
        { id: 'performance', text: '性能' }
      ];

      riskTypes.forEach((risk, index) => {
        const riskGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        riskGroup.setAttribute('transform', `translate(${iconStartX + index * iconGap}, ${riskY})`);

        // 背景框
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', '-20');
        rect.setAttribute('y', '-10');
        rect.setAttribute('width', '40');
        rect.setAttribute('height', '20');
        rect.setAttribute('rx', '2');
        rect.setAttribute('ry', '2');
        rect.setAttribute('fill', 'none');

        // 文本
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('font-size', fontSizes.status);

        // 使用新的风险判断逻辑
        const hasRisk = (riskType: string) => {
          // 检查所有组件的风险状态
          return Object.values(node.iconStatus || {}).some(status => {
            const componentStatus = status as ComponentStatus;
            return componentStatus.risks && componentStatus.risks[riskType as keyof ComponentStatus['risks']];
          });
        };

        if (node.type === 'entry') {
          if (hasRisk(risk.id)) {
            text.setAttribute('fill', colors.warning);      // 风险用黄色
            rect.setAttribute('stroke', colors.warning);
            rect.setAttribute('fill', 'rgba(250, 173, 20, 0.1)');
          } else {
            text.setAttribute('fill', colors.healthy);      // 健康用绿色
            rect.setAttribute('stroke', colors.healthy);
            rect.setAttribute('fill', 'rgba(82, 196, 26, 0.1)');
          }
        } else {
          // 服务节点的样式保持不变
          if (hasRisk(risk.id)) {
            text.setAttribute('fill', colors.warning);
            rect.setAttribute('stroke', colors.warning);
            rect.setAttribute('fill', 'rgba(250, 173, 20, 0.1)');
          } else {
            text.setAttribute('fill', colors.healthy);
            rect.setAttribute('stroke', colors.healthy);
            rect.setAttribute('fill', 'rgba(82, 196, 26, 0.1)');
          }
        }

        text.textContent = risk.text;
        riskGroup.appendChild(rect);
        riskGroup.appendChild(text);
        nodeGroup.appendChild(riskGroup);
      });

      // 故障数渲染
      const totalFaults = Object.values(node.iconStatus || {}).reduce((sum, status) => 
        sum + ((status as ComponentStatus).faultCount || 0), 0);

      if (totalFaults > 0 || (node.type === 'entry' && node.id === 'submit-order')) {
        const faultGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        faultGroup.setAttribute('transform', `translate(${iconStartX + 3 * iconGap}, ${riskY})`);

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', '-20');
        rect.setAttribute('y', '-10');
        rect.setAttribute('width', '40');
        rect.setAttribute('height', '20');
        rect.setAttribute('rx', '2');
        rect.setAttribute('fill', 'none');
        rect.setAttribute('stroke', colors.error);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('font-size', fontSizes.status);
        text.setAttribute('fill', colors.error);
        text.textContent = `故${totalFaults}`;

        faultGroup.appendChild(rect);
        faultGroup.appendChild(text);
        nodeGroup.appendChild(faultGroup);
      }

      svg.appendChild(nodeGroup);
    });

    // Draw edges with curves
    edges.forEach(edge => {
      const sourcePos = nodePositions.get(edge.source);
      const targetPos = nodePositions.get(edge.target);

      if (sourcePos && targetPos) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const sourceWidth = sourcePos.width;
        const x1 = sourcePos.x + sourceWidth/2;
        const y1 = sourcePos.y;
        const x2 = targetPos.x - targetPos.width/2;
        const y2 = targetPos.y;

        const controlPoint1X = x1 + (x2 - x1) * 0.4;  // 调整曲线控制点
        const controlPoint2X = x2 - (x2 - x1) * 0.4;  // 使连线更平滑

        path.setAttribute('d', `
          M ${x1} ${y1}
          C ${controlPoint1X} ${y1},
            ${controlPoint2X} ${y2},
            ${x2} ${y2}
        `);
        path.setAttribute('stroke', '#1890ff');
        path.setAttribute('stroke-width', '1.5');
        path.setAttribute('fill', 'none');
        path.setAttribute('marker-end', 'url(#arrow)');
        
        svg.insertBefore(path, svg.firstChild);
      }
    });

    // 修改自动缩放部分
    const bbox = svg.getBBox();
    const padding = 40;
    const scale = Math.min(
      containerWidth / (bbox.width + padding * 2),
      containerHeight / (bbox.height + padding * 2)
    );
    
    // 只在需要时才进行缩放（当内容超出容器时）
    if (scale < 1) {
      const rootGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const transform = `
        translate(${(containerWidth - bbox.width * scale) / 2 - bbox.x * scale},
                  ${(containerHeight - bbox.height * scale) / 2 - bbox.y * scale})
        scale(${scale})
      `;
      rootGroup.setAttribute('transform', transform);
      
      // 将所有现有元素移动到新的根组
      while (svg.firstChild) {
        rootGroup.appendChild(svg.firstChild);
      }
      svg.appendChild(rootGroup);
    }

    // 暂时注释掉 d3 缩放功能
    /*
    const zoom = d3.zoom()
      .scaleExtent([0.5, 2])
      .on('zoom', (event) => {
        svg.select('g').attr('transform', event.transform);
      });

    d3.select(svg).call(zoom);
    
    svg.on('dblclick.zoom', null);
    svg.on('dblclick', () => {
      d3.select(svg).transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity);
    });
    */
  }, [nodes, edges]);

  return (
    <div className="topology-graph">
      <svg ref={svgRef} />
    </div>
  );
};

export default TopologyGraph; 