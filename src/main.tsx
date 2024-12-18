import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN';
import AppLayout from './components/Layout';
import BusinessFlowPage from './pages/BusinessFlow';
import LinkTopologyPage from './pages/LinkTopology';
import ChangeScreenPage from './pages/ChangeScreen';
import 'antd/dist/reset.css';
import './styles/global.less';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/business-flow" element={<BusinessFlowPage />} />
            <Route path="/topology/:flowId" element={<LinkTopologyPage />} />
            <Route path="/change-screen" element={<ChangeScreenPage />} />
            <Route path="/" element={<Navigate to="/business-flow" replace />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
); 