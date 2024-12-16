import React, { useState } from 'react';
import { Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import BusinessTree from './components/BusinessTree';
import TopologyGraph from './components/TopologyGraph';
import './styles.less';

const { Sider, Content } = Layout;

const LinkTopologyPage: React.FC = () => {
  const [selectedLink, setSelectedLink] = useState<string>();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSider = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="link-topology-page">
      <Sider 
        width={300} 
        theme="light" 
        className="left-sider"
        collapsible
        collapsed={collapsed}
        trigger={null}
      >
        <BusinessTree onSelect={setSelectedLink} />
        <div className="sider-trigger" onClick={toggleSider}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </Sider>
      <Content className="right-content">
        <TopologyGraph linkId={selectedLink} />
      </Content>
    </Layout>
  );
};

export default LinkTopologyPage; 