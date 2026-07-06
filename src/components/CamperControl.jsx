import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, FileText, User, HelpCircle, Check, AlertTriangle, FolderOpen, Download, FileArchive, Loader2, X } from 'lucide-react';
import CamperModal from './CamperModal';

export default function CamperControl({ campers, onAddCamper, onUpdateCamper, onDeleteCamper }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [camperToEdit, setCamperToEdit] = useState(null);
  
  // Custom confirmation state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [explorerCamper, setExplorerCamper] = useState(null);

  // Filter campers based on search
  const filteredCampers = campers.filter(camper => {
    const term = searchTerm.toLowerCase();
    return (
      camper.name.toLowerCase().includes(term) ||
      camper.id.toLowerCase().includes(term) ||
      camper.representative.toLowerCase().includes(term) ||
      (camper.sessionNum && camper.sessionNum.toLowerCase().includes(term)) ||
      (camper.rateCode && camper.rateCode.toLowerCase().includes(term))
    );
  });

  const handleEditClick = (camper) => {
    setCamperToEdit(camper);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setCamperToEdit(null);
    setIsModalOpen(true);
  };

  const handleSave = (camperData) => {
    if (camperToEdit) {
      onUpdateCamper(camperData);
    } else {
      onAddCamper(camperData);
    }
  };

  const confirmDelete = (camper) => {
    setDeleteTarget(camper);
  };

  const executeDelete = () => {
    if (deleteTarget) {
      onDeleteCamper(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-display font-extrabold text-slate-800 tracking-tight">
            Control de Campistas
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Registro, edición y carga de expedientes médicos y comprobantes.
          </p>
        </div>
        
        <button
          onClick={handleCreateClick}
          className="bg-camp-green hover:bg-camp-green-dark text-white font-semibold text-sm px-5 py-3 rounded-2xl flex items-center space-x-2 shadow-lg shadow-camp-green/10 cursor-pointer hover:-translate-y-[1px] active:translate-y-[1px]"
        >
          <Plus className="h-4.5 w-4.5" />
          <span>Registrar Campista</span>
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        
        {/* Search Bar / Stats Summary */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="h-4.5 w-4.5" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, código, representante, sesión o tarifa..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-2xl text-slate-800 text-sm placeholder:text-slate-400 focus:bg-white"
            />
          </div>
          
          <div className="text-xs text-slate-500 font-medium">
            Mostrando <span className="text-camp-green font-bold">{filteredCampers.length}</span> de <span className="text-slate-700 font-bold">{campers.length}</span> campistas registrados
          </div>
        </div>

        {/* Table Body */}
        {filteredCampers.length === 0 ? (
          <div className="p-16 text-center max-w-md mx-auto">
            <div className="h-16 w-16 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="text-base font-bold text-slate-700">No se encontraron campistas</h3>
            <p className="text-xs text-slate-500 mt-2">
              {searchTerm 
                ? 'No hay registros que coincidan con los criterios de búsqueda. Pruebe otro término.' 
                : 'Aún no se han registrado campistas en la base de datos de esta temporada.'}
            </p>
            {!searchTerm && (
              <button
                onClick={handleCreateClick}
                className="mt-4 px-4 py-2 bg-camp-green-light hover:bg-camp-green-medium/20 text-camp-green-dark font-semibold text-xs rounded-xl cursor-pointer"
              >
                Registrar primer campista
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  <th className="py-4.5 px-6">Código / ID</th>
                  <th className="py-4.5 px-6">Nombre del Campista</th>
                  <th className="py-4.5 px-6 text-center">Sesión</th>
                  <th className="py-4.5 px-6 text-center">Edad</th>
                  <th className="py-4.5 px-6">Condición</th>
                  <th className="py-4.5 px-6">Código de Tarifa / Método</th>
                  <th className="py-4.5 px-6 text-right">Tarifa Facturable</th>
                  <th className="py-4.5 px-6 text-center">Expediente (Files)</th>
                  <th className="py-4.5 px-6 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {filteredCampers.map((camper) => (
                  <tr key={camper.id} className="hover:bg-slate-50/50">
                    {/* ID */}
                    <td className="py-4 px-6 font-mono text-xs font-semibold text-slate-800">
                      {camper.id}
                    </td>
                    
                    {/* Name & Representative */}
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-bold text-slate-800">{camper.name}</p>
                        <p className="text-[11px] text-slate-400 flex items-center space-x-1 mt-0.5">
                          <User className="h-3 w-3 inline text-slate-400" />
                          <span>Representante: {camper.representative}</span>
                        </p>
                      </div>
                    </td>
                    
                    {/* Session */}
                    <td className="py-4 px-6 text-center">
                      <div>
                        <span className="inline-flex items-center px-2.5 py-0.5 bg-camp-green-light text-camp-green-dark text-xs font-bold rounded-lg border border-camp-green-medium/20">
                          {camper.sessionNum || 'N/A'}
                        </span>
                        {camper.servicePeriod && (
                          <p className="text-[10px] text-slate-400 mt-1 font-semibold">
                            {camper.servicePeriod}
                          </p>
                        )}
                      </div>
                    </td>
                    
                    {/* Age */}
                    <td className="py-4 px-6 text-center font-semibold text-slate-850">
                      {camper.age} años
                    </td>
                    
                    {/* Condition */}
                    <td className="py-4 px-6">
                      {camper.condition === 'Nuevo' ? (
                        <span className="inline-flex items-center px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100">
                          Nuevo
                        </span>
                      ) : (
                        <div className="inline-block">
                          <span className="inline-flex items-center px-2.5 py-1 bg-camp-amber-light/70 text-camp-amber-dark text-xs font-bold rounded-lg border border-camp-amber-light">
                            Reincorporado
                          </span>
                          {camper.previousSeason && (
                            <p className="text-[10px] text-slate-400 mt-1 font-semibold italic">
                              ({camper.previousSeason})
                            </p>
                          )}
                        </div>
                      )}
                    </td>
                    
                    {/* Payment Method & Rate Code */}
                    <td className="py-4 px-6">
                      <div className="inline-block">
                        {camper.paymentMethod === 'Seguro' ? (
                          <span className="inline-flex items-center px-2.5 py-1 bg-camp-navy-muted text-camp-navy text-xs font-bold rounded-lg border border-[#D0DFEF]">
                            {camper.rateCode || 'Seguro'}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 bg-slate-100 text-slate-650 text-xs font-bold rounded-lg border border-slate-200">
                            {camper.rateCode || 'Privado'}
                          </span>
                        )}
                        {camper.rateDescription && (
                          <p className="text-[10px] text-slate-400 mt-1 font-semibold italic max-w-[180px] truncate" title={camper.rateDescription}>
                            {camper.rateDescription}
                          </p>
                        )}
                      </div>
                    </td>
                    
                    {/* Amount */}
                    <td className="py-4 px-6 text-right font-bold text-slate-800 font-mono">
                      <div>
                        <p>{formatCurrency(camper.paymentAmount)}</p>
                        <span className="text-[10px] text-slate-400 font-normal font-sans block mt-0.5">
                          {camper.paymentMethod === 'Seguro' ? 'por Seguro' : 'por Privado'}
                        </span>
                      </div>
                    </td>
                    
                    {/* Virtual documentation list summary */}
                    <td className="py-4 px-6 text-center">
                      {camper.files && camper.files.length > 0 ? (
                        <div className="group relative inline-block">
                          <button
                            type="button"
                            onClick={() => setExplorerCamper(camper)}
                            className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-camp-green-light text-camp-green-dark hover:bg-camp-green-medium/20 text-xs font-bold rounded-lg border border-camp-green-light cursor-pointer"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            <span>{camper.files.length} {camper.files.length === 1 ? 'archivo' : 'archivos'}</span>
                          </button>
                          
                          {/* Floating interactive tooltip */}
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-40 bg-slate-900 text-white text-[11px] rounded-xl p-3 shadow-xl w-56 border border-slate-700 pointer-events-none">
                            <p className="font-bold border-b border-slate-700 pb-1 mb-1.5">Documentos asociados:</p>
                            <ul className="space-y-1">
                              {camper.files.map((f, i) => (
                                <li key={i} className="truncate">• {f.name}</li>
                              ))}
                            </ul>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          Sin documentos
                        </span>
                      )}
                    </td>
                    
                    {/* Actions */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEditClick(camper)}
                          className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl cursor-pointer transition-colors"
                          title="Editar expediente"
                        >
                          <Edit2 className="h-4.5 w-4.5" />
                        </button>
                        <button
                          onClick={() => confirmDelete(camper)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl cursor-pointer transition-colors"
                          title="Eliminar registro"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-55 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 text-center animate-scale-up">
            <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-rose-50 border border-rose-100 text-rose-600 mb-4">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-800">
              ¿Confirmar Eliminación?
            </h3>
            <p className="text-xs text-slate-500 mt-2 px-4">
              Esta acción eliminará de forma permanente el expediente de <strong className="text-slate-700">{deleteTarget.name}</strong> (Código: <span className="font-mono">{deleteTarget.id}</span>), incluyendo todos los archivos y facturas virtuales indexadas en el sistema.
            </p>
            <div className="flex items-center justify-center space-x-3 mt-6">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2.5 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-650 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={executeDelete}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-650/15 cursor-pointer"
              >
                Eliminar Registro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Explorer Modal */}
      {explorerCamper && (
        <DocumentExplorerModal
          camper={explorerCamper}
          onClose={() => setExplorerCamper(null)}
        />
      )}

      {/* Register/Edit Modal */}
      <CamperModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        camperToEdit={camperToEdit}
        existingCampers={campers}
      />
    </div>
  );
}

// Interactive Document Explorer Modal Component
function DocumentExplorerModal({ camper, onClose }) {
  const [downloadingFile, setDownloadingFile] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  const triggerDownload = (fileName) => {
    setDownloadingFile(fileName);
    setTimeout(() => {
      setDownloadingFile(null);
      setDownloadSuccess(`El archivo "${fileName}" se ha descargado exitosamente.`);
      setTimeout(() => setDownloadSuccess(null), 3000);
    }, 1200);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col animate-scale-up">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-camp-green-light p-2.5 rounded-xl text-camp-green">
              <FolderOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-slate-800">
                Expediente Digital del Campista
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {camper.name} • Código: <span className="font-mono">{camper.id}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-655 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 max-h-[60vh]">
          {downloadSuccess && (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-3.5 rounded-2xl text-xs font-semibold flex items-center space-x-2 animate-slide-down">
              <Check className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{downloadSuccess}</span>
            </div>
          )}

          <div className="space-y-3">
            {camper.files.map((file, idx) => {
              const isDownloading = downloadingFile === file.name;
              return (
                <div key={idx} className="flex items-center justify-between bg-slate-50 hover:bg-slate-100/70 p-4 rounded-2xl border border-slate-100 transition-colors">
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="p-2.5 bg-white rounded-xl shadow-sm text-camp-green border border-slate-100 shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-700 truncate">
                        {file.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                        Tamaño: {formatFileSize(file.size)} • Cargado el: {file.uploadDate}
                      </p>
                    </div>
                  </div>
                  <button
                    disabled={isDownloading}
                    onClick={() => triggerDownload(file.name)}
                    className="flex items-center space-x-1.5 px-3.5 py-2 bg-white hover:bg-camp-navy hover:text-white text-slate-600 rounded-xl text-xs font-bold shadow-sm border border-slate-200/50 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDownloading ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-camp-navy" />
                    ) : (
                      <Download className="h-3.5 w-3.5" />
                    )}
                    <span>{isDownloading ? 'Descargando...' : 'Descargar'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-655 cursor-pointer"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
