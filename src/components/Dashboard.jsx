import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  Filter, 
  Users, 
  DollarSign, 
  Wallet, 
  TrendingUp, 
  FileCheck, 
  Percent 
} from 'lucide-react';

export default function Dashboard({ campers }) {
  // Filter states
  const [paymentFilter, setPaymentFilter] = useState('Todos'); // Todos, Seguro, Privado
  const [conditionFilter, setConditionFilter] = useState('Todos'); // Todos, Nuevo, Reincorporado

  // Apply filters to data
  const filteredCampers = useMemo(() => {
    return campers.filter(camper => {
      const matchPayment = paymentFilter === 'Todos' || camper.paymentMethod === paymentFilter;
      const matchCondition = conditionFilter === 'Todos' || camper.condition === conditionFilter;
      return matchPayment && matchCondition;
    });
  }, [campers, paymentFilter, conditionFilter]);

  // KPI Calculations
  const stats = useMemo(() => {
    const totalCount = filteredCampers.length;
    const totalRevenue = filteredCampers.reduce((sum, c) => sum + c.paymentAmount, 0);
    const averagePayment = totalCount > 0 ? totalRevenue / totalCount : 0;
    
    // Percentage covered by insurance
    const insuranceCount = filteredCampers.filter(c => c.paymentMethod === 'Seguro').length;
    const insurancePct = totalCount > 0 ? (insuranceCount / totalCount) * 100 : 0;

    return {
      totalCount,
      totalRevenue,
      averagePayment,
      insurancePct
    };
  }, [filteredCampers]);

  // Chart 1 Data: Payment Method Distribution
  const paymentChartData = useMemo(() => {
    const counts = filteredCampers.reduce((acc, camper) => {
      acc[camper.paymentMethod] = (acc[camper.paymentMethod] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    }));
  }, [filteredCampers]);

  // Chart 2 Data: Condition Distribution
  const conditionChartData = useMemo(() => {
    const counts = filteredCampers.reduce((acc, camper) => {
      acc[camper.condition] = (acc[camper.condition] || 0) + 1;
      return acc;
    }, {});

    return [
      { name: 'Nuevo', Cantidad: counts['Nuevo'] || 0 },
      { name: 'Reincorporado', Cantidad: counts['Reincorporado'] || 0 }
    ];
  }, [filteredCampers]);

  // Chart 3 Data: Camp Session Distribution (using all campers context for full camp health representation)
  const sessionChartData = useMemo(() => {
    const data = campers.reduce((acc, camper) => {
      const session = camper.sessionNum || 'N/A';
      if (!acc[session]) {
        acc[session] = { name: session, Campistas: 0, Recaudacion: 0 };
      }
      acc[session].Campistas += 1;
      acc[session].Recaudacion += camper.paymentAmount;
      return acc;
    }, {});

    return Object.values(data).sort((a, b) => a.name.localeCompare(b.name));
  }, [campers]);

  // Chart Theme Colors
  const COLORS = {
    Seguro: '#1E3A5F',     // Camp Navy
    Privado: '#527E26',    // Camp Green
    Nuevo: '#78A54A',      // Green Medium
    Reincorporado: '#D97706' // Amber
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('es-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Custom tooltips for better styling matching the app theme
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl border border-slate-700 shadow-xl text-xs font-sans">
          <p className="font-bold">{payload[0].name}</p>
          <p className="mt-1 flex items-center space-x-1.5">
            <span className="font-semibold text-camp-amber-light">Valor:</span>
            <span>{payload[0].value} {payload[0].value === 1 ? 'campista' : 'campistas'}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h1 className="text-2xl font-display font-extrabold text-slate-800 tracking-tight">
          Dashboard Estadístico
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Analítica de recaudación, segmentación de métodos de pago y condiciones del campamento.
        </p>
      </div>

      {/* Interactive Filters Panel */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 text-slate-700">
          <Filter className="h-4.5 w-4.5 text-camp-green" />
          <h2 className="text-sm font-bold">Filtros de Segmentación</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Payment Method filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 block">Método de Pago</label>
            <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl">
              {['Todos', 'Seguro', 'Privado'].map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentFilter(method)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                    paymentFilter === method 
                      ? 'bg-white text-camp-navy shadow-sm border border-slate-200/50' 
                      : 'text-slate-555 hover:text-slate-800 hover:bg-white/30'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Condition filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 block">Condición del Campista</label>
            <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl">
              {['Todos', 'Nuevo', 'Reincorporado'].map((cond) => (
                <button
                  key={cond}
                  onClick={() => setConditionFilter(cond)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                    conditionFilter === cond 
                      ? 'bg-white text-camp-green shadow-sm border border-slate-200/50' 
                      : 'text-slate-555 hover:text-slate-800 hover:bg-white/30'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI 1: Registrados */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all group">
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Campistas Registrados
            </p>
            <h3 className="text-3xl font-display font-extrabold text-slate-800">
              {stats.totalCount}
            </h3>
            <p className="text-[10px] text-slate-500">
              {filteredCampers.length === campers.length 
                ? 'Total acumulado de la temporada' 
                : 'Segmentados por filtros actuales'}
            </p>
          </div>
          <div className="p-4 bg-camp-green-light text-camp-green rounded-2xl group-hover:scale-105 transition-transform duration-250 border border-camp-green-light">
            <Users className="h-6 w-6" />
          </div>
        </div>

        {/* KPI 2: Recaudación */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all group">
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Recaudación Total
            </p>
            <h3 className="text-3xl font-display font-extrabold text-camp-navy">
              {formatCurrency(stats.totalRevenue)}
            </h3>
            <p className="text-[10px] text-slate-500 flex items-center space-x-1">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-500 inline" />
              <span>Suma total de facturación</span>
            </p>
          </div>
          <div className="p-4 bg-camp-navy-muted text-camp-navy rounded-2xl group-hover:scale-105 transition-transform duration-250 border border-[#D0DFEF]">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>

        {/* KPI 3: Monto Promedio */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all group">
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Ingreso Promedio
            </p>
            <h3 className="text-3xl font-display font-extrabold text-slate-800">
              {formatCurrency(stats.averagePayment)}
            </h3>
            <p className="text-[10px] text-slate-500">
              Ingreso medio por campista
            </p>
          </div>
          <div className="p-4 bg-amber-50 text-camp-amber rounded-2xl group-hover:scale-105 transition-transform duration-250 border border-amber-100">
            <Wallet className="h-6 w-6" />
          </div>
        </div>

        {/* KPI 4: Porcentaje Cobertura Seguro */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all group">
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Cuota de Seguro
            </p>
            <h3 className="text-3xl font-display font-extrabold text-slate-800">
              {stats.insurancePct.toFixed(1)}%
            </h3>
            <p className="text-[10px] text-slate-500">
              Proporción con Seguro (Waiver)
            </p>
          </div>
          <div className="p-4 bg-slate-50 text-slate-500 rounded-2xl group-hover:scale-105 transition-transform duration-250 border border-slate-100">
            <Percent className="h-6 w-6" />
          </div>
        </div>

      </div>

      {/* Charts Grid */}
      {filteredCampers.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-100 shadow-sm text-center max-w-md mx-auto">
          <div className="h-12 w-12 rounded-full bg-amber-50 text-camp-amber flex items-center justify-center mx-auto mb-4 border border-amber-100">
            <Filter className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-700">Sin datos de gráficos</h3>
          <p className="text-xs text-slate-400 mt-1">
            No hay campistas activos con esta combinación de filtros. Modifique su selección para visualizar las estadísticas.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Chart 1: Proporción del Método de Pago */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[420px]">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Distribución de Métodos de Pago</h3>
              <p className="text-[10px] text-slate-400">Porcentaje comparativo entre cobertura de Seguro y Privado</p>
            </div>
            
            <div className="h-64 my-4 flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={6}
                    dataKey="value"
                  >
                    {paymentChartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.name === 'Seguro' ? COLORS.Seguro : COLORS.Privado} 
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle"
                    formatter={(value) => <span className="text-xs font-bold text-slate-600">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-around text-center text-xs">
              {paymentChartData.map((entry) => {
                const isSeguro = entry.name === 'Seguro';
                const pct = ((entry.value / stats.totalCount) * 100).toFixed(0);
                return (
                  <div key={entry.name}>
                    <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">{entry.name}</p>
                    <p className="text-lg font-extrabold text-slate-700 mt-0.5">{entry.value} campistas</p>
                    <span className={`inline-block px-1.5 py-0.5 mt-1 rounded text-[10px] font-bold ${
                      isSeguro ? 'bg-camp-navy-muted text-camp-navy' : 'bg-camp-green-light text-camp-green-dark'
                    }`}>
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chart 2: Relación Niños Nuevos vs Reincorporados */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[420px]">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Relación de Campistas Nuevos vs Reincorporados</h3>
              <p className="text-[10px] text-slate-400">Total de registros segmentados según su condición de ingreso</p>
            </div>
            
            <div className="h-64 my-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={conditionChartData}
                  margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748B', fontSize: 11, fontWeight: 'bold' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748B', fontSize: 11, fontWeight: 'bold' }} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(226, 232, 240, 0.4)' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const name = payload[0].payload.name;
                        const value = payload[0].value;
                        return (
                          <div className="bg-slate-900 text-white p-3 rounded-xl border border-slate-700 shadow-xl text-xs">
                            <p className="font-bold">Condición: {name}</p>
                            <p className="mt-1">Cantidad: <strong className="text-camp-amber-light">{value} campistas</strong></p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="Cantidad" 
                    radius={[10, 10, 0, 0]}
                    barSize={40}
                  >
                    {conditionChartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.name === 'Nuevo' ? COLORS.Nuevo : COLORS.Reincorporado} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-around text-center text-xs">
              {conditionChartData.map((entry) => {
                const isNuevo = entry.name === 'Nuevo';
                const pct = stats.totalCount > 0 ? ((entry.Cantidad / stats.totalCount) * 100).toFixed(0) : 0;
                return (
                  <div key={entry.name}>
                    <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">{entry.name}</p>
                    <p className="text-lg font-extrabold text-slate-700 mt-0.5">{entry.Cantidad} campistas</p>
                    <span className={`inline-block px-1.5 py-0.5 mt-1 rounded text-[10px] font-bold ${
                      isNuevo ? 'bg-emerald-50 text-emerald-700' : 'bg-camp-amber-light text-camp-amber-dark'
                    }`}>
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chart 3: Sessions Breakdown (Full Camp Health metrics) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm col-span-1 lg:col-span-2 min-h-[420px] flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Métricas Consolidadas por Sesión de Campamento</h3>
              <p className="text-[10px] text-slate-400">Total de campistas registrados e ingresos facturados acumulados por sesión (Camp1 - Camp5)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4 flex-1 items-center">
              {/* Session Bar Chart */}
              <div className="md:col-span-2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sessionChartData}
                    margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748B', fontSize: 11, fontWeight: 'bold' }} 
                    />
                    <YAxis 
                      yAxisId="left"
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748B', fontSize: 11, fontWeight: 'bold' }} 
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748B', fontSize: 11, fontWeight: 'bold' }} 
                    />
                    <Tooltip 
                      cursor={{ fill: 'rgba(226, 232, 240, 0.4)' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const sessionName = payload[0].payload.name;
                          const campersCount = payload[0].payload.Campistas;
                          const revenue = payload[0].payload.Recaudacion;
                          return (
                            <div className="bg-slate-900 text-white p-3 rounded-xl border border-slate-700 shadow-xl text-xs">
                              <p className="font-bold">Sesión: {sessionName}</p>
                              <p className="mt-1">Campistas: <strong className="text-camp-amber-light">{campersCount}</strong></p>
                              <p className="mt-0.5">Recaudación: <strong className="text-emerald-400">{formatCurrency(revenue)}</strong></p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar 
                      yAxisId="left"
                      dataKey="Campistas" 
                      fill="#78A54A" 
                      radius={[6, 6, 0, 0]}
                      barSize={20}
                      name="Campistas"
                    />
                    <Bar 
                      yAxisId="right"
                      dataKey="Recaudacion" 
                      fill="#1E3A5F" 
                      radius={[6, 6, 0, 0]}
                      barSize={20}
                      name="Facturación (USD)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Session list table */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-center space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 pb-1.5">Resumen de Sesiones</p>
                <div className="space-y-2.5 max-h-[190px] overflow-y-auto pr-1">
                  {sessionChartData.map((session) => (
                    <div key={session.name} className="flex justify-between items-center text-xs border-b border-slate-100/50 pb-1 last:border-0 last:pb-0">
                      <div className="font-bold text-slate-700">{session.name}</div>
                      <div className="text-right">
                        <p className="font-extrabold text-slate-800">{session.Campistas} campistas</p>
                        <p className="text-[10px] font-semibold text-emerald-600 font-mono mt-0.5">{formatCurrency(session.Recaudacion)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
