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

  return (
    <Row gutter={[16, 16]} className="business-flows">
      {Object.entries(mockBusinessFlows as Record<string, BusinessFlow[]>).map(([moduleId, flows]) => (
        <Col key={moduleId} span={3}>
          <Row gutter={[0, 16]}>
            {flows.map(flow => (
              <Col key={flow.id} span={24}>
                <div 
                  className={`flow-item ${flow?.isError ?? false ? 'error' : ''} ${flow.name === '提交订单' ? 'clickable' : ''}`}
                  onClick={() => handleFlowClick(flow.id, flow.name)}
                >
                  <div className="flow-name">{flow.name}</div>
                  <div className="flow-metrics">
                    <div className="metric">
                      <span>耗时</span>
                      <span className={flow.metrics.time > 5000 ? 'error' : ''}>
                        {flow.metrics.time}ms
                      </span>
                    </div>
                    <div className="metric">
                      <span>成功率</span>
                      <span>{flow.metrics.successRate}%</span>
                    </div>
                    <div className="metric">
                      <span>TPS</span>
                      <span className={flow.metrics?.tpsError ?? false ? 'error' : ''}>
                        {flow.metrics.tps}
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