import React, { useEffect, useRef } from 'react';
import { TopologyNode } from '../index';
import '../styles.less';

interface TopologyGraphProps {
  nodes: TopologyNode[];
  edges: { source: string; target: string; }[];
}

const getMetricColor = (value: number, baseline: number, isEntry: boolean) => {
  const ratio = value / baseline;
  if (ratio <= 1.2) return isEntry ? '#fff' : '#52c41a';
  if (ratio <= 1.5) return '#faad14';
  return '#ff4d4f';
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
    const startX = 150;                    // 左边距
    const startY = containerHeight / 5;    // 减小顶部空间
    const levelGap = 350;                  // 水平间距
    const verticalGap = 140;               // 减小垂直间距

    // 为业务入口节点设置特定位置
    const entryPositions: Record<string, { level: number; index: number }> = {
      'pay-complete': { level: 0, index: 0 },
      'pay-notify': { level: 0, index: 1 },
      'debt-query': { level: 0, index: 2 },
      'submit-order': { level: 0, index: 3 },
      'request-settle': { level: 0, index: 4 }
    };

    // Create node map for edge drawing
    const nodePositions = new Map();

    // Draw nodes
    nodes.forEach(node => {
      const level = levels[node.id];
      let indexInLevel = levelNodes[level].indexOf(node.id);
      
      // 如果是入口节点，使用预定义位置
      if (node.type === 'entry' && entryPositions[node.id]) {
        indexInLevel = entryPositions[node.id].index;
      }
      
      const x = startX + level * levelGap;
      const y = startY + indexInLevel * verticalGap;

      const isEntry = node.type === 'entry';
      const width = isEntry ? 180 : 240;
      const height = isEntry ? 100 : 140;

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
      rect.setAttribute('fill', isEntry ? '#00BCD4' : '#213559');
      if (!isEntry) {
        rect.setAttribute('stroke', '#1890ff');
        rect.setAttribute('stroke-width', '1');
      }
      nodeGroup.appendChild(rect);

      // Node title
      const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      title.setAttribute('x', '0');
      title.setAttribute('y', `-${height/2 - 20}`);
      title.setAttribute('text-anchor', 'middle');
      title.setAttribute('fill', '#fff');
      title.setAttribute('font-size', '16');
      title.setAttribute('font-weight', 'bold');
      title.textContent = node.name;
      nodeGroup.appendChild(title);

      // Node metrics
      const metrics = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      metrics.setAttribute('x', `-${width/2 - 20}`);
      metrics.setAttribute('y', `-${height/2 - 45}`);
      metrics.innerHTML = `
        <tspan x="-${width/2 - 20}" dy="0">
          <tspan fill="#fff">耗时: </tspan>
          <tspan fill="${getMetricColor(node.metrics.responseTime, node.metrics.baseline.responseTime, node.type === 'entry')}">
            ${node.metrics.responseTime}/${node.metrics.baseline.responseTime}ms
          </tspan>
        </tspan>
        <tspan x="-${width/2 - 20}" dy="18">
          <tspan fill="#fff">成功率: </tspan>
          <tspan fill="${getMetricColor(node.metrics.successRate, node.metrics.baseline.successRate, node.type === 'entry')}">
            ${node.metrics.successRate}/${node.metrics.baseline.successRate}%
          </tspan>
        </tspan>
        <tspan x="-${width/2 - 20}" dy="18">
          <tspan fill="#fff">流量: </tspan>
          <tspan fill="${getMetricColor(node.metrics.tps, node.metrics.baseline.tps, node.type === 'entry')}">
            ${node.metrics.tps}/${node.metrics.baseline.tps}tps
          </tspan>
        </tspan>
        ${node.metrics.saturation !== undefined ? `
          <tspan x="-${width/2 - 20}" dy="18">
            <tspan fill="#fff">饱和度: </tspan>
            <tspan fill="${getMetricColor(node.metrics.saturation, node.metrics.baseline.saturation || 80, node.type === 'entry')}">
              ${node.metrics.saturation}/${node.metrics.baseline.saturation || 80}%
            </tspan>
          </tspan>
        ` : ''}
      `;
      nodeGroup.appendChild(metrics);

      // Icon rendering section
      const iconStartX = -52;
      const iconGap = 36;
      const iconY = height/2 - 15;  // 调整图标位置，更靠近底部

      const iconTypes = [
        { id: 'db', text: 'DB' },
        { id: 'mq', text: 'MQ' },
        { id: 'cache', text: '缓存' }
      ];

      // 修改图标渲染逻辑，只在非入口节点显示
      if (node.type !== 'entry') {  // 只在服务节点显示组件指标
        iconTypes.forEach((icon, index) => {
          const iconGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          iconGroup.setAttribute('transform', 
            `translate(${iconStartX + index * iconGap}, ${iconY})`);

          // Background circle
          const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          circle.setAttribute('r', '14');
          circle.setAttribute('fill', '#1d39c4');
          circle.setAttribute('opacity', '0.1');
          iconGroup.appendChild(circle);

          // Rectangle border
          const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          rect.setAttribute('x', '-12');
          rect.setAttribute('y', '-10');
          rect.setAttribute('width', '24');
          rect.setAttribute('height', '20');
          rect.setAttribute('rx', '2');
          rect.setAttribute('ry', '2');
          rect.setAttribute('fill', 'none');
          
          // Icon text
          const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          text.setAttribute('text-anchor', 'middle');
          text.setAttribute('dominant-baseline', 'middle');
          text.setAttribute('font-size', '12');

          if (node.icons?.includes(icon.id)) {
            // Component is present
            const status = node.iconStatus?.[icon.id] || 'healthy';
            const color = status === 'error' ? '#f5222d' : '#52c41a';
            text.setAttribute('fill', color);
            rect.setAttribute('stroke', color);
          } else {
            // Component is not present
            text.setAttribute('fill', '#8c8c8c');
            rect.setAttribute('stroke', '#8c8c8c');
            rect.setAttribute('opacity', '0.45');
            text.setAttribute('opacity', '0.45');
          }

          text.textContent = icon.text;
          iconGroup.appendChild(rect);
          iconGroup.appendChild(text);
          nodeGroup.appendChild(iconGroup);
        });
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

        const controlPoint1X = x1 + (x2 - x1) * 0.3;
        const controlPoint2X = x2 - (x2 - x1) * 0.3;

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

  }, [nodes, edges]);

  return (
    <div className="topology-graph">
      <svg ref={svgRef} />
    </div>
  );
};

export default TopologyGraph; 