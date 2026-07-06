import React, { useState } from 'react';
import { Shield, Lock, User, AlertCircle, ArrowRight, Trees, Eye, EyeOff } from 'lucide-react';
import { storage } from '../utils/storage';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    setLoading(true);
    
    // Simulate minor network delay for premium feel
    setTimeout(() => {
      if (username.toLowerCase() === 'admin' && password === 'admin123') {
        storage.saveSession(username);
        onLogin(username);
      } else {
        setError('Credenciales inválidas. Intente con admin / admin123.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-radial from-slate-100 to-[#F0EFEA] p-4 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-slate-100">
        
        {/* Left Side: Brand Visual */}
        <div className="md:w-1/2 bg-gradient-to-br from-camp-green via-camp-green-dark to-camp-navy p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-camp-amber/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-md border border-white/20">
                <Trees className="h-8 w-8 text-camp-amber-light" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-extrabold tracking-wide text-white">
                  CAMP LOYALTOWN
                </h1>
                <p className="text-[10px] text-camp-green-light font-medium tracking-widest uppercase">
                  Est. 1957 • AHRC
                </p>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight mb-6">
              Plataforma Central de Gestión y Control Administrativo
            </h2>
            <p className="text-camp-green-light/85 text-sm leading-relaxed max-w-md">
              Bienvenido al repositorio seguro del personal administrativo autorizado. Gestione de forma centralizada la información médica, autorizaciones, pagos y estadísticas clave.
            </p>
          </div>

          <div className="mt-12 relative z-10">
            <div className="space-y-4 text-xs text-white/80">
              <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                <span>Control de Expedientes y Archivos (Dropzone digital)</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="h-2 w-2 rounded-full bg-camp-amber"></div>
                <span>Dashboard de Recaudación y Métodos de Pago en tiempo real</span>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-xs text-white/50">
              <span>© {new Date().getFullYear()} Camp Loyaltown Inc.</span>
              <span>v1.2.0</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white">
          <div className="mb-10">
            <h3 className="text-3xl font-display font-bold text-slate-800 tracking-tight">
              Iniciar Sesión
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              Ingrese sus credenciales administrativas para acceder al sistema.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center space-x-2 bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-2xl text-sm animate-shake">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">
                Nombre de Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ej. admin"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50/80 border border-slate-200 rounded-2xl text-slate-800 text-sm transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">
                  Contraseña
                </label>
                <span className="text-xs text-slate-400 hover:text-camp-green cursor-pointer transition-colors">
                  ¿Olvidó su contraseña?
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-50/80 border border-slate-200 rounded-2xl text-slate-800 text-sm transition-all placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-655 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                defaultChecked
                className="h-4 w-4 text-camp-green border-slate-300 rounded accent-camp-green"
              />
              <label htmlFor="remember" className="ml-2 text-xs text-slate-500 cursor-pointer">
                Mantener sesión iniciada en este dispositivo
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-camp-navy hover:bg-camp-navy-light text-white rounded-2xl font-semibold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-camp-navy/15 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed hover:-translate-y-[1px] active:translate-y-[1px]"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Ingresar al Sistema</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start space-x-3 text-xs text-slate-500">
            <Shield className="h-5 w-5 text-camp-green shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-700">Acceso de Demostración:</p>
              <p className="mt-1">
                Usuario: <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-800">admin</code> • 
                Contraseña: <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-800">admin123</code>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
