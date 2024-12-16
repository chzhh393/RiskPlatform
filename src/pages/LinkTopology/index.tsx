import React, { useState } from 'react';
import { Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import BusinessTree, { BusinessTreeProps } from './components/BusinessTree';
import TopologyGraph from './components/TopologyGraph';
import { mockBusinessData } from './services/api';
import './styles.less';

const { Sider, Content } = Layout;

const LinkTopologyPage: React.FC = () => {
  const [selectedLinkId, setSelectedLinkId] = useState<string | undefined>(undefined);
  const [collapsed, setCollapsed] = useState(false);

  const handleSelect: BusinessTreeProps['onSelect'] = (key) => {
    setSelectedLinkId(key);
  };

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
        <BusinessTree 
          data={mockBusinessData}
          onSelect={handleSelect} 
        />
        <div className="sider-trigger" onClick={toggleSider}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </Sider>
      <Content className="right-content">
        <TopologyGraph linkId={selectedLinkId} />
      </Content>
    </Layout>
  );
};

export default LinkTopologyPage; 