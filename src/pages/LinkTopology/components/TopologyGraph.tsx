import React, { useEffect, useRef } from 'react';
import G6 from '@antv/g6';
import './TopologyGraph.less';

interface NodeMetrics {
  time: number;
  successRate: number;
  tps: number;
  saturation?: number;
  sqlTime?: number;
  connectionPool?: number;
  tpsError?: boolean;
}

interface TopologyGraphProps {
  data: {
    nodes: {
      id: string;
      label: string;
      metrics: NodeMetrics;
      style?: any;
    }[];
    edges: {
      source: string;
      target: string;
    }[];
  };
}

const TopologyGraph: React.FC<TopologyGraphProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.scrollWidth;
    const height = containerRef.current.scrollHeight || 600;

    G6.registerNode('service-node', {
      draw: (cfg: any, group) => {
        const metrics = cfg.metrics || {};
        const isDRDS = cfg.label === 'DRDS';
        const isSubmit = cfg.label === '提交订单';
        
        // 判断节点是否有错误指标
        const hasError = 
          metrics.sqlTime > 200 || // sql耗时超过200ms
          (isDRDS && metrics.connectionPool > 80) || // DRDS连接池超过80%
          metrics.time > 500 || // 响应时间超过500ms
          metrics.successRate < 99.8; // 成功率低于99.8%

        const rectConfig = {
          width: 240,
          height: 100,
          radius: 4,
          stroke: hasError ? '#ff4d4f' : '#000000',
          lineWidth: 1,
          fill: '#fff',
        };

        const rect = group.addShape('rect', {
          attrs: {
            x: 0,
            y: 0,
            ...rectConfig,
          },
        });

        // 标题 - 如果有错误指标，标题也显示红色
        group.addShape('text', {
          attrs: {
            text: cfg.label,
            x: rectConfig.width / 2,
            y: 20,
            textAlign: 'center',
            textBaseline: 'middle',
            fill: hasError || isDRDS ? '#ff4d4f' : '#333',
            fontSize: 14,
            fontWeight: 500,
          },
        });

        // 指标行1 - 分开显示耗时和成功率，DRDS不显示净耗时
        if (!isDRDS) {
          const timeText = group.addShape('text', {
            attrs: {
              text: `${isSubmit ? '耗时' : '净耗时'}: ${metrics.time || '-'}`,
              x: 20,
              y: 45,
              fill: metrics.time > 500 ? '#ff4d4f' : '#666',
              fontSize: 12,
            },
          });

          group.addShape('text', {
            attrs: {
              text: `成功率: ${metrics.successRate || '-'}%`,
              x: timeText.getBBox().maxX + 20,
              y: 45,
              fill: metrics.successRate < 99.8 ? '#ff4d4f' : '#666',
              fontSize: 12,
            },
          });

          // tps 显示
          const tpsText = group.addShape('text', {
            attrs: {
              text: `tps: ${metrics.tps || '-'}`,
              x: 20,
              y: 65,
              fill: metrics.tpsError ? '#ff4d4f' : '#666',
              fontSize: 12,
            },
          });

          if (cfg.label === '支付中心数据服务') {
            // sql耗时
            const sqlText = group.addShape('text', {
              attrs: {
                text: `sql耗时: ${metrics.sqlTime}`,
                x: tpsText.getBBox().maxX + 20,
                y: 65,
                fill: metrics.sqlTime > 200 ? '#ff4d4f' : '#666',
                fontSize: 12,
              },
            });

            // 饱和度
            group.addShape('text', {
              attrs: {
                text: `饱和度: ${metrics.saturation || '-'}%`,
                x: sqlText.getBBox().maxX + 20,
                y: 65,
                fill: (metrics.saturation || 0) > 80 ? '#ff4d4f' : '#666',
                fontSize: 12,
              },
            });

            // 最近变更时间
            group.addShape('text', {
              attrs: {
                text: '最近变更时间：11.14 15:06:00',
                x: 20,
                y: 85,
                fill: '#666',
                fontSize: 12,
              },
            });
          } else {
            // 其他节点只显示饱和度
            group.addShape('text', {
              attrs: {
                text: `饱和度: ${metrics.saturation || '-'}%`,
                x: 120,
                y: 65,
                fill: (metrics.saturation || 0) > 80 ? '#ff4d4f' : '#666',
                fontSize: 12,
              },
            });
          }
        } else {
          // DRDS 显示成功率和 tps 在同一行
          const successText = group.addShape('text', {
            attrs: {
              text: `成功率: ${metrics.successRate || '-'}%`,
              x: 20,
              y: 45,
              fill: metrics.successRate < 99.8 ? '#ff4d4f' : '#666',
              fontSize: 12,
            },
          });

          group.addShape('text', {
            attrs: {
              text: `tps: ${metrics.tps || '-'}`,
              x: successText.getBBox().maxX + 20,
              y: 45,
              fill: metrics.tpsError ? '#ff4d4f' : '#666',
              fontSize: 12,
            },
          });

          // SQL耗时和连接池
          if (metrics.sqlTime) {
            group.addShape('text', {
              attrs: {
                text: `sql耗时: ${metrics.sqlTime}`,
                x: 20,
                y: 65,
                fill: metrics.sqlTime > 200 ? '#ff4d4f' : '#666',
                fontSize: 12,
              },
            });
          }

          group.addShape('text', {
            attrs: {
              text: `连接池: ${metrics.connectionPool || '-'}%`,
              x: 120,
              y: 65,
              fill: (metrics.connectionPool || 0) > 80 ? '#ff4d4f' : '#666',
              fontSize: 12,
            },
          });

          // 最近变更时间放在最下面
          group.addShape('text', {
            attrs: {
              text: '最近变更时间：11.21 15:06:00',
              x: 20,
              y: 85,
              fill: '#666',
              fontSize: 12,
            },
          });
        }

        return rect;
      },
    });

    const graph = new G6.Graph({
      container: containerRef.current,
      width,
      height,
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
      },
      defaultNode: {
        type: 'service-node',
      },
      defaultEdge: {
        type: 'line',
        style: {
          stroke: '#1890ff',
          lineWidth: 1,
          endArrow: true,
        },
      },
      layout: {
        type: 'dagre',
        rankdir: 'LR',
        nodesep: 60,
        ranksep: 80,
      },
      animate: true,
    });

    graph.data(data);
    graph.render();
    graphRef.current = graph;

    return () => {
      graph.destroy();
    };
  }, [data]);

  return <div ref={containerRef} className="topology-graph" />;
};

export default TopologyGraph; 