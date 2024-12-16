import React from 'react';
import { Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { BusinessScenario, BusinessEntry } from '../types';

interface BusinessTreeProps {
  data: BusinessScenario[];
  onSelect: (key: string) => void;
}

const BusinessTree: React.FC<BusinessTreeProps> = ({ data, onSelect }) => {
  // 转换数据格式以适配 Tree 组件
  const treeData: DataNode[] = data.map(scenario => ({
    title: scenario.name,
    key: scenario.key,
    children: scenario.entries.map((entry: BusinessEntry) => ({
      title: (
        <span className="tree-node-content">
          {entry.title}
          <span className={`level-tag ${entry.level.toLowerCase()}`}>
            {entry.level}
          </span>
        </span>
      ),
      key: entry.key,
      isLeaf: true,
    })),
  }));

  return (
    <div className="business-tree-container">
      <div className="tree-title">业务场景</div>
      <Tree
        defaultExpandAll
        treeData={treeData}
        onSelect={(selectedKeys) => {
          if (selectedKeys.length > 0) {
            onSelect(selectedKeys[0].toString());
          }
        }}
      />
    </div>
  );
};

export default BusinessTree; 