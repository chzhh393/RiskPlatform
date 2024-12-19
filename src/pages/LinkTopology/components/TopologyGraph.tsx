import React, { useEffect, useRef } from 'react';
import './TopologyGraph.less';

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

interface TopologyNode {
  id: string;
  name: string;
  metrics: NodeMetrics;
  icons?: string[];
}

interface TopologyProps {
  nodes: TopologyNode[];
  edges: { source: string; target: string; }[];
}

// 添加图标路径定义
const iconPaths = {
  db: 'M12 3C7.58 3 4 4.79 4 7V17C4 19.21 7.58 21 12 21S20 19.21 20 17V7C20 4.79 16.42 3 12 3M18 17C18 17.5 15.87 19 12 19S6 17.5 6 17V14.77C7.61 15.55 9.72 16 12 16S16.39 15.55 18 14.77V17M18 12.45C16.7 13.4 14.42 14 12 14C9.58 14 7.3 13.4 6 12.45V9.64C7.47 10.47 9.61 11 12 11C14.39 11 16.53 10.47 18 9.64V12.45M12 9C8.13 9 6 7.5 6 7S8.13 5 12 5C15.87 5 18 6.5 18 7S15.87 9 12 9Z',
  mq: 'M3 6C3 4.9 3.9 4 5 4H19C20.1 4 21 4.9 21 6V18C21 19.1 20.1 20 19 20H5C3.9 20 3 19.1 3 18V6M5 6V18H19V6H5M7 9H17V11H7V9M7 13H17V15H7V13Z',
  cache: 'M9 3V4H4V6H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V6H20V4H15V3H9M7 6H17V19H7V6M9 8V17H11V8H9M13 8V17H15V8H13Z'
};

const IconBox: React.FC<{ text: string; active: boolean; color?: string }> = ({ text, active, color }) => {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  
  // 方框背景
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('width', '32');
  rect.setAttribute('height', '20');
  rect.setAttribute('rx', '2');
  rect.setAttribute('fill', 'transparent');
  rect.setAttribute('stroke', active ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.25)');
  rect.setAttribute('stroke-width', '1');
  g.appendChild(rect);

  // 文字
  const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textElement.setAttribute('x', '16');
  textElement.setAttribute('y', '14');
  textElement.setAttribute('text-anchor', 'middle');
  textElement.setAttribute('fill', active ? color || 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.25)');
  textElement.setAttribute('font-size', '12');
  textElement.textContent = text;
  g.appendChild(textElement);

  return g;
};

const getIconColor = (node: any, iconType: string) => {
  // If node has iconStatus and status is specified for this icon
  if (node.iconStatus && node.iconStatus[iconType]) {
    return node.iconStatus[iconType] === 'error' ? '#ff4d4f' : '#52c41a';
  }
  // Default to healthy green if no status specified
  return '#52c41a';
};

// Add new function for submit node metric color
const getSubmitMetricColor = (value: number, baseline: number) => {
  const ratio = value / baseline;
  if (ratio <= 1.2) return '#ffffff'; // Use white for healthy state
  if (ratio <= 1.5) return '#faad14'; // Warning stays orange
  return '#ff4d4f'; // Error stays red
};

const TopologyGraph: React.FC<TopologyProps> = ({ nodes, edges }) => {
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

    // 添加箭头定义
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5"
        markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#1890ff"/>
      </marker>
    `;
    svg.appendChild(defs);

    // 添加状态图例
    const legend = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const legendItems = [
      { color: '#52c41a', text: '健康' },
      { color: '#faad14', text: '亚健康' },
      { color: '#ff4d4f', text: '瓶颈' }
    ];

    legendItems.forEach((item, index) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('transform', `translate(${containerWidth - 120}, ${20 + index * 25})`);

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('r', '6');
      circle.setAttribute('fill', item.color);
      g.appendChild(circle);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', '15');
      text.setAttribute('y', '5');
      text.setAttribute('fill', '#fff');
      text.setAttribute('font-size', '12');
      text.textContent = item.text;
      g.appendChild(text);

      legend.appendChild(g);
    });
    svg.appendChild(legend);

    // 计算节点位置
    const startX = 100;
    const startY = containerHeight / 4;
    const levelGap = 300;
    const verticalGap = 160;

    // 计算层级
    const levels: { [key: string]: number } = {};
    const queue = ['submit'];
    levels['submit'] = 0;
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      const nextNodes = edges
        .filter(edge => edge.source === current)
        .map(edge => edge.target);
      
      nextNodes.forEach(node => {
        if (levels[node] === undefined) {
          levels[node] = levels[current] + 1;
          queue.push(node);
        }
      });
    }

    // 计算每层节点数量和位置
    const levelNodes: { [key: number]: string[] } = {};
    Object.entries(levels).forEach(([nodeId, level]) => {
      if (!levelNodes[level]) levelNodes[level] = [];
      levelNodes[level].push(nodeId);
    });

    // 修改渲染图标的部分
    const renderIcons = (nodeGroup: SVGGElement, node: any, icons: string[] = [], y: number) => {
      const iconStartX = -52;
      const iconGap = 36;

      const iconTypes = [
        { id: 'db', text: 'DB' },
        { id: 'mq', text: 'MQ' },
        { id: 'cache', text: '缓存' }
      ];

      iconTypes.forEach((icon, index) => {
        const iconGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        iconGroup.setAttribute('transform', 
          `translate(${iconStartX + index * iconGap}, ${y})`);
        
        const iconBox = IconBox({
          text: icon.text,
          active: icons.includes(icon.id),
          color: getIconColor(node, icon.id)
        });
        
        iconGroup.appendChild(iconBox);
        nodeGroup.appendChild(iconGroup);
      });
    };

    // 渲染节点
    nodes.forEach(node => {
      const level = levels[node.id];
      const indexInLevel = levelNodes[level].indexOf(node.id);
      
      const x = startX + level * levelGap;
      const y = startY + indexInLevel * verticalGap;

      const nodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      nodeGroup.setAttribute('transform', `translate(${x},${y})`);

      // 渲染节点背景
      const isSubmit = node.id === 'submit';
      const width = isSubmit ? 180 : 240;
      const height = isSubmit ? 100 : 140;

      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('width', width.toString());
      rect.setAttribute('height', height.toString());
      rect.setAttribute('x', `-${width/2}`);
      rect.setAttribute('y', `-${height/2}`);
      rect.setAttribute('fill', isSubmit ? '#00BCD4' : '#213559');
      if (!isSubmit) {
        rect.setAttribute('stroke', '#1890ff');
        rect.setAttribute('stroke-width', '1');
      }
      rect.setAttribute('rx', '4');
      nodeGroup.appendChild(rect);

      // 渲染标题 - 上移标题位置
      const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      title.setAttribute('x', '0');
      title.setAttribute('y', `-${height/2 - 20}`);  // 调整标题位置
      title.setAttribute('text-anchor', 'middle');
      title.setAttribute('fill', '#fff');
      title.setAttribute('font-size', '16');
      title.setAttribute('font-weight', 'bold');
      title.textContent = node.name;
      nodeGroup.appendChild(title);

      // 渲染指标 - 调整指标位置和间距
      const getMetricColor = (value: number, baseline: number) => {
        const ratio = value / baseline;
        if (ratio <= 1.2) return '#52c41a'; // Healthy - up to 20% above baseline
        if (ratio <= 1.5) return '#faad14'; // Warning - 20-50% above baseline
        return '#ff4d4f'; // Bottleneck - more than 50% above baseline
      };

      const metrics = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      metrics.setAttribute('x', `-${width/2 - 20}`);
      
      if (isSubmit) {
        metrics.innerHTML = `
          <tspan x="-${width/2 - 20}" dy="0">
            <tspan fill="#fff">耗时: </tspan>
            <tspan fill="${getSubmitMetricColor(node.metrics.responseTime, node.metrics.baseline.responseTime)}">
              ${node.metrics.responseTime}/${node.metrics.baseline.responseTime}ms
            </tspan>
          </tspan>
          <tspan x="-${width/2 - 20}" dy="20">
            <tspan fill="#fff">成功率: </tspan>
            <tspan fill="${getSubmitMetricColor(node.metrics.successRate, node.metrics.baseline.successRate)}">
              ${node.metrics.successRate}/${node.metrics.baseline.successRate}%
            </tspan>
          </tspan>
          <tspan x="-${width/2 - 20}" dy="20">
            <tspan fill="#fff">流量: </tspan>
            <tspan fill="${getSubmitMetricColor(node.metrics.tps, node.metrics.baseline.tps)}">
              ${node.metrics.tps}/${node.metrics.baseline.tps}tps
            </tspan>
          </tspan>
        `;
      } else {
        // 服务节点指标 - 减小间距，确保不会与图标重叠
        metrics.setAttribute('y', `-${height/2 - 45}`);  // 调整起始位置
        metrics.innerHTML = `
          <tspan x="-${width/2 - 20}" dy="0">
            <tspan fill="#fff">净耗时: </tspan>
            <tspan fill="${getMetricColor(node.metrics.responseTime, node.metrics.baseline.responseTime)}">${node.metrics.responseTime}/${node.metrics.baseline.responseTime}ms</tspan>
          </tspan>
          <tspan x="-${width/2 - 20}" dy="18">
            <tspan fill="#fff">成功率: </tspan>
            <tspan fill="${getMetricColor(node.metrics.successRate, node.metrics.baseline.successRate)}">${node.metrics.successRate}/${node.metrics.baseline.successRate}%</tspan>
          </tspan>
          <tspan x="-${width/2 - 20}" dy="18">
            <tspan fill="#fff">流量: </tspan>
            <tspan fill="${getMetricColor(node.metrics.tps, node.metrics.baseline.tps)}">${node.metrics.tps}/${node.metrics.baseline.tps}tps</tspan>
          </tspan>
          <tspan x="-${width/2 - 20}" dy="18">
            <tspan fill="#fff">饱和度: </tspan>
            <tspan fill="${getMetricColor(node.metrics.saturation, node.metrics.baseline.saturation)}">${node.metrics.saturation}/${node.metrics.baseline.saturation}%</tspan>
          </tspan>
        `;

        // 渲染底部图标 - 调整图标位置
        if (node.icons) {
          const iconY = height/2 - 30;
          renderIcons(nodeGroup, node, node.icons || [], iconY);
        }
      }
      nodeGroup.appendChild(metrics);
      svg.appendChild(nodeGroup);
    });

    // 渲染连线
    edges.forEach(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      if (!sourceNode || !targetNode) return;

      const sourceLevel = levels[edge.source];
      const targetLevel = levels[edge.target];
      const sourceIndex = levelNodes[sourceLevel].indexOf(edge.source);
      const targetIndex = levelNodes[targetLevel].indexOf(edge.target);

      const sourceX = startX + sourceLevel * levelGap;
      const sourceY = startY + sourceIndex * verticalGap;
      const targetX = startX + targetLevel * levelGap;
      const targetY = startY + targetIndex * verticalGap;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const controlPoint1X = sourceX + levelGap * 0.3;
      const controlPoint2X = targetX - levelGap * 0.3;
      
      path.setAttribute('d', `
        M ${sourceX + (sourceNode.id === 'submit' ? 90 : 120)} ${sourceY}
        C ${controlPoint1X} ${sourceY},
          ${controlPoint2X} ${targetY},
          ${targetX - 120} ${targetY}
      `);
      path.setAttribute('stroke', '#1890ff');
      path.setAttribute('stroke-width', '1.5');
      path.setAttribute('fill', 'none');
      path.setAttribute('marker-end', 'url(#arrow)');
      svg.insertBefore(path, svg.firstChild);
    });
  }, [nodes, edges]);

  return (
    <div className="topology-graph">
      <svg ref={svgRef} />
    </div>
  );
};

export default TopologyGraph; 