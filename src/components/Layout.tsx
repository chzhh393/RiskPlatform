import React from 'react';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Layout.less';

const { Content } = Layout;

interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const openChangeScreen = () => {
    window.open('/change-screen', '_blank');
  };

  const openBusinessFlow = () => {
    window.open('/business-flow', '_blank');
  };

  return (
    <Layout className="app-layout">
      <div className="status-bar">
        <div className="screen-links">
          <div className="screen-link" onClick={openBusinessFlow}>业务大屏</div>
          <div className="screen-link" onClick={openChangeScreen}>变更大屏</div>
        </div>
      </div>
      <Content className="app-content">
        {children}
      </Content>
    </Layout>
  );
};

export default AppLayout; 