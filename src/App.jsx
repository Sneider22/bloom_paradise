import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import CamperControl from './components/CamperControl';
import Dashboard from './components/Dashboard';
import { storage } from './utils/storage';
import { ShieldCheck, AlertCircle, Menu } from 'lucide-react';

export default function App() {
  const [session, setSession] = useState(null);
  const [campers, setCampers] = useState([]);
  const [activeTab, setActiveTab] = useState('control'); // control, dashboard
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [notification, setNotification] = useState(null);

  // Load session and camper data on mount
  useEffect(() => {
    const activeSession = storage.getSession();
    if (activeSession) {
      setSession(activeSession);
    }
    
    // Read campers data (this will also seed localStorage with mock data if empty)
    const data = storage.getCampers();
    setCampers(data);
    setAppReady(true);
  }, []);

  const handleLogin = (username) => {
    const newSession = storage.getSession();
    setSession(newSession);
    showNotification('Sesión iniciada correctamente', 'success');
  };

  const handleLogout = () => {
    storage.clearSession();
    setSession(null);
    showNotification('Sesión cerrada correctamente', 'info');
  };

  // Helper notification bubble
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // CRUD Wrapper Functions
  const handleAddCamper = (camper) => {
    try {
      const updated = storage.addCamper(camper);
      setCampers(updated);
      showNotification(`Campista "${camper.name}" registrado correctamente.`);
    } catch (err) {
      showNotification(err.message, 'error');
    }
  };

  const handleUpdateCamper = (camper) => {
    try {
      const updated = storage.updateCamper(camper);
      setCampers(updated);
      showNotification(`Expediente de "${camper.name}" actualizado.`);
    } catch (err) {
      showNotification('Error al actualizar el expediente.', 'error');
    }
  };

  const handleDeleteCamper = (id) => {
    try {
      const camper = campers.find(c => c.id === id);
      const updated = storage.deleteCamper(id);
      setCampers(updated);
      showNotification(`El campista "${camper ? camper.name : id}" ha sido eliminado.`);
    } catch (err) {
      showNotification('Error al eliminar el registro.', 'error');
    }
  };

  if (!appReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F5]">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-10 w-10 border-4 border-camp-green border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Cargando Sistema...</p>
        </div>
      </div>
    );
  }

  // Not Logged In
  if (!session) {
    return <Login onLogin={handleLogin} />;
  }

  // Logged In layout
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 relative overflow-hidden font-sans">
      
      {/* Floating System Notifications */}
      {notification && (
        <div className="fixed top-6 right-6 z-55 flex items-center space-x-3 px-5 py-3.5 bg-slate-900 border border-slate-700 text-white rounded-2xl shadow-2xl animate-slide-in-right max-w-sm">
          {notification.type === 'error' ? (
            <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
          ) : (
            <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
          )}
          <span className="text-xs font-semibold">{notification.message}</span>
        </div>
      )}

      {/* Mobile Top Header */}
      <header className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm shrink-0">
        <div className="flex items-center space-x-3">
          <div className="bg-camp-green p-2 rounded-xl text-white">
            <span className="text-base">🏕️</span>
          </div>
          <div>
            <h2 className="text-sm font-display font-extrabold text-slate-800 tracking-tight leading-none">
              CAMP LOYALTOWN
            </h2>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">
              Panel Administrativo
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl cursor-pointer"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {/* Mobile Sidebar Backdrop Overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-45"
        />
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        username={session.username}
        onLogout={handleLogout}
        isMobileOpen={isSidebarOpen}
        setIsMobileOpen={setIsSidebarOpen}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 h-[calc(100vh-65px)] lg:h-screen overflow-y-auto p-4 sm:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'control' ? (
            <CamperControl
              campers={campers}
              onAddCamper={handleAddCamper}
              onUpdateCamper={handleUpdateCamper}
              onDeleteCamper={handleDeleteCamper}
            />
          ) : (
            <Dashboard campers={campers} />
          )}
        </div>
      </main>

    </div>
  );
}
