import React from 'react';
import { Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { mockBusinessData } from '../mock/data';

interface BusinessTreeProps {
  onSelect: (linkId: string) => void;
}

const BusinessTree: React.FC<BusinessTreeProps> = ({ onSelect }) => {
  // 转换数据格式以适配Tree组件
  const treeData: DataNode[] = mockBusinessData.map(scenario => ({
    title: scenario.name,
    key: scenario.key,
    children: scenario.children.map(entry => ({
      title: (
        <div className="tree-node-content">
          <span>{entry.title}</span>
          <span className={`level-tag ${entry.level === '核心' ? 'core' : 'non-core'}`}>
            {entry.level}
          </span>
        </div>
      ),
      key: entry.key,
      isLeaf: true,
    }))
  }));

  const handleSelect = (selectedKeys: React.Key[]) => {
    const key = selectedKeys[0] as string;
    if (key.startsWith('entry-')) {
      onSelect(key);
    }
  };

  return (
    <div className="business-tree-container">
      <h3 className="tree-title">业务场景</h3>
      <Tree
        className="business-tree"
        defaultExpandAll
        treeData={treeData}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default BusinessTree; 