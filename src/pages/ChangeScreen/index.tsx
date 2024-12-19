import React from 'react';
import { Card } from 'antd';
import ChangeList from './components/ChangeList';
import './styles.less';

const ChangeScreenPage: React.FC = () => {
  return (
    <div className="change-screen-page">
      <Card>
        <ChangeList />
      </Card>
    </div>
  );
};

export default ChangeScreenPage; 