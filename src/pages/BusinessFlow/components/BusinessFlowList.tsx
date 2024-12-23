import React from 'react';
import { Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BusinessFlow } from '../types';
import { mockBusinessFlows } from '../mock/data';

const BusinessFlowList: React.FC = () => {
  const navigate = useNavigate();

  const handleFlowClick = (flowId: string, flowName: string) => {
    if (flowName === '提交订单') {
      navigate(`/topology/${flowId}`);
    }
  };

  const isMetricError = (value: number, baseline: number) => {
    return value / baseline > 1.5;
  };

  const isFlowError = (metrics: any) => {
    return isMetricError(metrics.time, metrics.baseline.time) ||
           isMetricError(metrics.successRate, metrics.baseline.successRate) ||
           isMetricError(metrics.tps, metrics.baseline.tps);
  };

  const getMetricColor = (value: number, baseline: number) => {
    const ratio = value / baseline;
    if (ratio <= 1.2) return ''; // Default color
    if (ratio <= 1.5) return 'warning';
    return 'error';
  };

  return (
    <Row gutter={[16, 8]} className="business-flows">
      {Object.entries(mockBusinessFlows as Record<string, BusinessFlow[]>).map(([moduleId, flows]) => (
        <Col key={moduleId} span={3}>
          <Row gutter={[0, 8]}>
            {flows.map(flow => (
              <Col key={flow.id} span={24}>
                <div 
                  className={`flow-item ${isFlowError(flow.metrics) ? 'error' : ''} ${flow.name === '提交订单' ? 'clickable' : ''}`}
                  onClick={() => handleFlowClick(flow.id, flow.name)}
                >
                  <div className="flow-name">{flow.name}</div>
                  <div className="flow-metrics">
                    <div className="metric">
                      <span>耗时</span>
                      <span className={getMetricColor(flow.metrics.time, flow.metrics.baseline.time)}>
                        {flow.metrics.time}/{flow.metrics.baseline.time}ms
                      </span>
                    </div>
                    <div className="metric">
                      <span>成功率</span>
                      <span className={getMetricColor(flow.metrics.successRate, flow.metrics.baseline.successRate)}>
                        {flow.metrics.successRate}/{flow.metrics.baseline.successRate}%
                      </span>
                    </div>
                    <div className="metric">
                      <span>TPS</span>
                      <span className={getMetricColor(flow.metrics.tps, flow.metrics.baseline.tps)}>
                        {flow.metrics.tps}/{flow.metrics.baseline.tps}
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      ))}
    </Row>
  );
};

export default BusinessFlowList; 