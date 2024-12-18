import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { mockFlowData } from '../mock/data';

interface BusinessFlowGraphProps {
  moduleId?: string;
}

const BusinessFlowGraph: React.FC<BusinessFlowGraphProps> = ({ moduleId }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'default',
      flowchart: {
        htmlLabels: true,
        curve: 'basis',
        nodeSpacing: 100,
        rankSpacing: 80,
        padding: 40,
      },
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current || !moduleId) return;

    const renderFlow = async () => {
      const flowData = mockFlowData[moduleId];
      if (!flowData) {
        containerRef.current!.innerHTML = '<div class="empty-tip">未找到业务链路数据</div>';
        return;
      }

      try {
        containerRef.current!.innerHTML = '';
        const { svg } = await mermaid.render('flow-graph', flowData);
        containerRef.current!.innerHTML = svg;

        // 添加动画效果
        const svgElement = containerRef.current!.querySelector('svg');
        if (svgElement) {
          const nodes = svgElement.querySelectorAll('.node');
          nodes.forEach((node, index) => {
            node.setAttribute('opacity', '0');
            node.setAttribute('transform', 'translate(0, 20)');
            setTimeout(() => {
              node.setAttribute('opacity', '1');
              node.setAttribute('transform', 'translate(0, 0)');
              node.setAttribute('style', 'transition: all 0.3s ease-out');
            }, index * 100);
          });
        }
      } catch (error) {
        console.error('业务链路图渲染失败:', error);
        containerRef.current!.innerHTML = '<div class="error-tip">业务链路图渲染失败</div>';
      }
    };

    renderFlow();
  }, [moduleId]);

  return (
    <div className="flow-graph" ref={containerRef}>
      {!moduleId && <div className="empty-tip">请选择业务模块查看链路图</div>}
    </div>
  );
};

export default BusinessFlowGraph; 