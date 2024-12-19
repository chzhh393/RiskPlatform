import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './Layout.less';

const { Header, Content } = Layout;

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    {
      key: 'business-flow',
      label: <Link to="/business-flow">业务大屏</Link>,
    },
    {
      key: 'link-topology',
      label: <Link to="/topology/flow-3">链路大屏</Link>,
    },
    {
      key: 'change-board',
      label: <Link to="/change-screen">变更大屏</Link>,
    },
  ];

  return (
    <Layout className="app-layout">
      <Header>
        <div className="logo">指挥平台</div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname.slice(1)]}
          items={menuItems}
        />
      </Header>
      <Content>{children}</Content>
    </Layout>
  );
};

export default AppLayout; 