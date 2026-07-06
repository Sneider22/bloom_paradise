import { Users, BarChart3, LogOut, Trees, UserCheck, ShieldAlert, X } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, username, onLogout, isMobileOpen, setIsMobileOpen }) {
  const menuItems = [
    {
      id: 'control',
      label: 'Control de Campistas',
      icon: Users,
      description: 'Registro y archivos'
    },
    {
      id: 'dashboard',
      label: 'Dashboard Estadístico',
      icon: BarChart3,
      description: 'Métricas e ingresos'
    }
  ];

  return (
    <aside className={`w-80 bg-white border-r border-slate-200 flex flex-col justify-between h-[100dvh] lg:h-screen overflow-y-auto lg:sticky top-0 shrink-0 select-none shadow-sm transition-transform duration-300 ease-in-out z-50 fixed lg:static inset-y-0 left-0 ${isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}`}>
      
      {/* Brand Header */}
      <div>
        <div className="p-4 lg:p-6 border-b border-slate-100 bg-gradient-to-r from-camp-green-light/45 to-transparent flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-camp-green p-2.5 rounded-2xl text-white shadow-md shadow-camp-green/10">
              <Trees className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-display font-extrabold text-slate-800 tracking-tight leading-none">
                CAMP LOYALTOWN
              </h2>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-1">
                Panel Administrativo
              </span>
            </div>
          </div>
          {/* Mobile close button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-650 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2 mt-3 lg:mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (setIsMobileOpen) setIsMobileOpen(false);
                }}
                className={`w-full flex items-center space-x-4 px-3.5 py-3 lg:px-4 lg:py-3.5 rounded-2xl text-left cursor-pointer transition-all duration-150 group ${
                  isActive
                    ? 'bg-camp-green text-white shadow-lg shadow-camp-green/15'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className={`p-2 rounded-xl transition-colors ${
                  isActive ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${
                    isActive ? 'text-white' : 'text-slate-700'
                  }`}>
                    {item.label}
                  </p>
                  <p className={`text-[10px] truncate ${
                    isActive ? 'text-camp-green-light/80' : 'text-slate-400'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Info & Logout */}
      <div className="p-3.5 lg:p-4 border-t border-slate-100">
        {/* User Card */}
        <div className="flex items-center space-x-3 p-2.5 lg:p-3 bg-slate-50 rounded-2xl border border-slate-100 mb-2.5 lg:mb-3">
          <div className="h-10 w-10 rounded-full bg-camp-navy text-white flex items-center justify-center font-display font-semibold shadow-sm">
            {username ? username.substring(0, 2).toUpperCase() : 'AD'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-700 truncate capitalize">
              {username || 'Administrador'}
            </p>
            <div className="flex items-center space-x-1 mt-0.5">
              <UserCheck className="h-3 w-3 text-camp-green" />
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Personal Autorizado
              </span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full py-2.5 lg:py-3 px-4 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 rounded-xl font-semibold text-xs flex items-center justify-center space-x-2 cursor-pointer transition-all border border-transparent hover:border-rose-100"
        >
          <LogOut className="h-4 w-4" />
          <span>Cerrar Sesión</span>
        </button>
      </div>

    </aside>
  );
}
