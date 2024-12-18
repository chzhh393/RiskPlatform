import React from 'react';
import { Card } from 'antd';
import BusinessModules from './components/BusinessModules';
import BusinessFlowList from './components/BusinessFlowList';
import { mockBusinessModules } from './mock/data';
import './styles.less';

const BusinessFlowPage: React.FC = () => {
  return (
    <div className="business-flow-page">
      <Card title="业务模块">
        <BusinessModules modules={mockBusinessModules} />
      </Card>
      <Card title="业务链路">
        <BusinessFlowList />
      </Card>
    </div>
  );
};

export default BusinessFlowPage; 