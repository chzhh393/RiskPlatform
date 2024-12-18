import React from 'react';
import { Card } from 'antd';
import TopologyGraph from './components/TopologyGraph';
import { useParams } from 'react-router-dom';
import { getTopologyData } from './mock/data';
import './styles.less';

const LinkTopologyPage: React.FC = () => {
  const { flowId } = useParams<{ flowId: string }>();
  const data = getTopologyData(flowId);

  return (
    <div className="link-topology-page">
      <Card title="链路拓扑">
        <TopologyGraph data={data} />
      </Card>
    </div>
  );
};

export default LinkTopologyPage; 