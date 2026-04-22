import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import InvoiceListPage from './components/InvoiceListPage';
import InvoiceDetailPage from './components/InvoiceDetailPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex h-screen bg-[#F8F8FB] dark:bg-[#141625] lg:flex-row max-lg:flex-col">
        <Sidebar />
        <main className="flex-1 overflow-y-auto lg:pl-25.75 max-lg:pt-20">
          <div className="mx-auto w-full max-w-182.5 px-6 pb-24 pt-19.25 max-lg:pt-8 max-lg:pb-16 lg:px-0">
            <Routes>
              <Route path="/" element={<InvoiceListPage />} />
              <Route path="/invoice/:id" element={<InvoiceDetailPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
