import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Switch } from 'antd';
import mermaid from 'mermaid';
import { mockTopologyData } from '../mock/data';

interface TopologyGraphProps {
  linkId?: string;
}

// 添加类型定义
interface TopologyData {
  [key: string]: string;
}

const TopologyGraph: React.FC<TopologyGraphProps> = ({ linkId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showAllMetrics, setShowAllMetrics] = useState(false);

  // 初始化 mermaid
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'default',
      flowchart: {
        htmlLabels: true,
        curve: 'basis',
        nodeSpacing: 80,
        rankSpacing: 100,
        diagramPadding: 20,
      },
    });
  }, []);

  // 过滤指标数据
  const formatMetrics = useCallback((metricsStr: string) => {
    if (!metricsStr) return '';

    const lines = metricsStr.split('<br/>');
    
    const filteredLines = lines.filter(line => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) return false;
      if (showAllMetrics) return true;
      if (!trimmedLine.includes(':')) return true;
      
      // 分割指标名和值
      const [, valueWithBaseline] = trimmedLine.split(':').map(s => s.trim());
      if (!valueWithBaseline) return true;
      
      const actualValue = valueWithBaseline.split('(')[0].trim();
      return actualValue !== '未覆盖';
    });

    return filteredLines.join('<br/>');
  }, [showAllMetrics]);

  // 处理节点文本
  const processNodeText = useCallback((text: string) => {
    // 首先分离节点名称和其他内容
    const [nodeName, ...rest] = text.split('<br/>');
    if (rest.length === 0) return text;

    // 分离路径和指标数据
    const parts = rest.join('<br/>').split(/<\/span>/);
    if (parts.length < 2) {
      // 如果只有路径，直接返回原文本
      return text;
    }

    // 提取路径和指标部分
    const pathSpan = parts[0] + '</span>';
    const metricsSpan = parts[1].match(/<span style='font-size:10px;color:#666'>(.+)$/);
    
    if (!metricsSpan) {
      // 如果没有指标数据，返回节点名称和路径
      return `${nodeName}<br/>${pathSpan}`;
    }

    // 处理指标数据
    const metricsContent = metricsSpan[1];
    const processedMetrics = formatMetrics(metricsContent);

    // 如果过滤后没有指标，只返回节点名称和路径
    if (!processedMetrics) {
      return `${nodeName}<br/>${pathSpan}`;
    }

    // 重组完整的节点文本
    return `${nodeName}<br/>${pathSpan}<br/><span style='font-size:10px;color:#666'>${processedMetrics}</span>`;
  }, [showAllMetrics, formatMetrics]);

  // 处理 mermaid 代码
  const processMermaidCode = useCallback((code: string) => {
    return code
      .split('\n')
      .map(line => {
        if (!line.includes('["')) return line;
        
        return line.replace(/\["([^"]+)"\]/g, (_, content) => {
          const processedContent = processNodeText(content);
          return `["${processedContent}"]`;
        });
      })
      .join('\n');
  }, [processNodeText]);

  useEffect(() => {
    if (!containerRef.current || !linkId) return;

    const renderDiagram = async () => {
      const topologyData = mockTopologyData as TopologyData;
      let mermaidCode = topologyData[linkId];
      if (!mermaidCode) {
        containerRef.current!.innerHTML = '<div class="error-tip">未找到拓扑图数据</div>';
        return;
      }

      try {
        containerRef.current!.innerHTML = '';
        const processedCode = processMermaidCode(mermaidCode);
        const { svg } = await mermaid.render('topology-graph', processedCode.trim());
        containerRef.current!.innerHTML = svg;
      } catch (error: unknown) {
        console.error('拓扑图渲染失败:', error);
        const errorMessage = error instanceof Error ? error.message : '未知错误';
        containerRef.current!.innerHTML = `
          <div class="error-tip">
            拓扑图渲染失败
            <div class="error-detail">${errorMessage}</div>
          </div>
        `;
      }
    };

    renderDiagram();
  }, [linkId, showAllMetrics, processMermaidCode]);

  return (
    <div className="topology-container">
      <div className="topology-header">
        <Switch
          id="metrics-display-switch"
          checked={showAllMetrics}
          onChange={setShowAllMetrics}
          checkedChildren="隐藏未覆盖指标"
          unCheckedChildren="显示全部指标"
        />
      </div>
      <div className="topology-graph" ref={containerRef}>
        {!linkId && <div className="empty-tip">请选择左侧链路查看拓扑图</div>}
      </div>
    </div>
  );
};

export default TopologyGraph; 