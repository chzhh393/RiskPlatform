import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import BusinessFlow from './pages/BusinessFlow';
import LinkTopology from './pages/LinkTopology';
import ChangeBoard from './pages/ChangeBoard';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/business-flow" element={<BusinessFlow />} />
          <Route path="/link-topology" element={<LinkTopology />} />
          <Route path="/change-board" element={<ChangeBoard />} />
          <Route path="/" element={<Navigate to="/business-flow" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App; 