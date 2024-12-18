import React from 'react';
import { Row, Col } from 'antd';
import { BusinessModule } from '../types';

interface BusinessModulesProps {
  modules: BusinessModule[];
}

const BusinessModules: React.FC<BusinessModulesProps> = ({ modules }) => {
  return (
    <Row gutter={[16, 16]} className="business-modules">
      {modules.map(module => (
        <Col key={module.id} span={3}>
          <div className={`module-item ${module.errorCount > 0 ? 'error' : ''}`}>
            <div className="module-name">{module.name}</div>
            <div className="module-count">
              <span className="error-count">{module.errorCount}</span>
              <span> / </span>
              <span className="total-count">{module.total}</span>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default BusinessModules; 