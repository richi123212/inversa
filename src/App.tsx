import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CatalogPage } from './pages/CatalogPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';

import { AboutInversaSection } from './components/AboutInversaSection';
import { ContactSection } from './components/ContactSection';
import { InversaChatbot } from './components/InversaChatbot';

const MainLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState<'tienda' | 'sobre_inversa' | 'contacto'>('tienda');
  const [activeTab, setActiveTab] = useState<'hardware' | 'crea_tu_web'>('hardware');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-[#080C14]">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="flex-1">
        {currentView === 'tienda' && (
          <CatalogPage
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
        {currentView === 'sobre_inversa' && (
          <AboutInversaSection onGoToStore={() => setCurrentView('tienda')} />
        )}
        {currentView === 'contacto' && (
          <ContactSection onGoToStore={() => setCurrentView('tienda')} />
        )}
      </div>
      <Footer 
        onNavigate={(view, tab) => {
          setCurrentView(view);
          if (tab) setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
      <CartDrawer />
      
      {/* Chatbot con FAQ Predictivo únicamente activo en la Tienda */}
      {currentView === 'tienda' && (
        <InversaChatbot 
          onNavigateTab={(tab) => {
            setActiveTab(tab);
          }}
        />
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Catalog & Quoter */}
            <Route path="/" element={<MainLayout />} />

            {/* Admin Login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Admin Dashboard */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                  <CartDrawer />
                </ProtectedRoute>
              }
            />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
