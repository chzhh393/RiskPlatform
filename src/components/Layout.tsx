import React from 'react';
import { Layout } from 'antd';
import './Layout.less';

const { Content } = Layout;

interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Layout className="app-layout">
      <div className="status-bar">
        <div className="status-item error">瓶颈链路：4</div>
        <div className="status-item warning">亚健康链路：0</div>
        <div className="status-item">总链路：38</div>
      </div>
      <Content className="app-content">
        {children}
      </Content>
    </Layout>
  );
};

export default AppLayout; 