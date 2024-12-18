import React from 'react';
import { Row, Col } from 'antd';
import { mockChangeData } from '../mock/data';

const ChangeList: React.FC = () => {
  return (
    <Row gutter={[16, 16]} className="change-list">
      {mockChangeData.map((timeGroup) => (
        <Col span={24} key={timeGroup.time}>
          <div className="time-group">
            <div className="time-header">{timeGroup.time}</div>
            <Row gutter={[16, 16]}>
              {timeGroup.changes.map((change, index) => (
                <Col span={6} key={index}>
                  <div className={`change-item ${change.count > 0 ? 'has-count' : ''}`}>
                    <div className="change-title">{change.title}</div>
                    <div className="change-time">{change.changeTime}</div>
                    {change.count > 0 && (
                      <div className="change-count">{change.count}</div>
                    )}
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default ChangeList; 