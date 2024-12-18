import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { mockChangeData } from './mock/data';
import './styles.less';

const ChangeBoard: React.FC = () => {
  const [changes, setChanges] = useState(mockChangeData);

  useEffect(() => {
    const timer = setInterval(() => {
      setChanges(prev => {
        const newChanges = [...prev];
        // 随机更新一些变更状态
        const randomIndex = Math.floor(Math.random() * newChanges.length);
        newChanges[randomIndex] = {
          ...newChanges[randomIndex],
          time: new Date().toLocaleTimeString()
        };
        return newChanges;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="change-board">
      <div className="time-header">
        {new Date().toLocaleDateString()} 变更大屏
      </div>
      <div className="changes-container">
        {changes.map((change, index) => (
          <Card key={index} className="change-card">
            <div className="change-time">{change.time}</div>
            <div className="change-app">{change.appName}</div>
            <div className={`change-status ${change.status}`}>
              {change.status === 'success' ? '变更成功' : '变更中'}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChangeBoard; 