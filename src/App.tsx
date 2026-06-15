import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import { AdminApp } from './admin/AdminApp.tsx';

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: 'var(--bg-card)', color: 'var(--text-base)', border: '1px solid var(--border)' },
        }}
      />
      <Routes>
        {/* Admin routes — no public navbar/footer */}
        <Route path="/admin/*" element={<AdminApp />} />

        {/* Public routes */}
        <Route path="/*" element={
          <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text-base)' }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
