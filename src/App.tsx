import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import BusinessFlow from './pages/BusinessFlow';
import LinkTopology from './pages/LinkTopology';
import NodeTopology from './pages/NodeTopology';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/business-flow" replace />} />
          <Route path="/business-flow" element={<BusinessFlow />} />
          <Route path="/topology/flow-3" element={<LinkTopology />} />
          <Route path="/node-topology" element={<NodeTopology />} />
          <Route path="*" element={<Navigate to="/business-flow" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;