import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, FileText, Trash2, Calendar, File, CheckCircle } from 'lucide-react';

const RATE_CODES = [
  { code: 'MW-Summer', desc: 'Medicaid Waiver Summer (7424)', method: 'Seguro', amount: 8.31 },
  { code: 'MW-INTB', desc: 'Medicaid Waiver Intensive (7425)-Behavioral', method: 'Seguro', amount: 11.16 },
  { code: 'NCD-350', desc: 'Nassau County Residents Living at Home', method: 'Seguro', amount: 175.00 },
  { code: 'OR', desc: 'Other Residences/Family Care', method: 'Privado', amount: 797.76 },
  { code: 'Custom', desc: 'Otro (Personalizado)', method: 'Seguro', amount: 0 }
];

const SESSIONS = [
  { num: 'Camp1', period: '6/14/26-6/28/26' },
  { num: 'Camp2', period: '6/28/26-7/12/26' },
  { num: 'Camp3', period: '7/12/26-7/26/26' },
  { num: 'Camp4', period: '7/26/26-8/9/26' },
  { num: 'Camp5', period: '8/9/26-8/23/26' },
  { num: 'Custom', period: '' }
];

export default function CamperModal({ isOpen, onClose, onSave, camperToEdit, existingCampers }) {
  const fileInputRef = useRef(null);
  
  // Form states
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [representative, setRepresentative] = useState('');
  const [condition, setCondition] = useState('Nuevo');
  const [previousSeason, setPreviousSeason] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Seguro');
  const [insuranceName, setInsuranceName] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [files, setFiles] = useState([]);
  
  // New Administrative fields
  const [rateCode, setRateCode] = useState('MW-Summer');
  const [rateDescription, setRateDescription] = useState('Medicaid Waiver Summer (7424)');
  const [sessionNum, setSessionNum] = useState('Camp1');
  const [servicePeriod, setServicePeriod] = useState('6/14/26-6/28/26');
  
  // Error & Drag states
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);

  // Initialize values when opening/editing
  useEffect(() => {
    if (camperToEdit) {
      setId(camperToEdit.id);
      setName(camperToEdit.name);
      setAge(camperToEdit.age.toString());
      setRepresentative(camperToEdit.representative);
      setCondition(camperToEdit.condition);
      setPreviousSeason(camperToEdit.previousSeason || '');
      setPaymentMethod(camperToEdit.paymentMethod);
      setInsuranceName(camperToEdit.insuranceName || '');
      setPaymentAmount(camperToEdit.paymentAmount.toString());
      setFiles(camperToEdit.files || []);
      setRateCode(camperToEdit.rateCode || 'MW-Summer');
      setRateDescription(camperToEdit.rateDescription || 'Medicaid Waiver Summer (7424)');
      setSessionNum(camperToEdit.sessionNum || 'Camp1');
      setServicePeriod(camperToEdit.servicePeriod || '6/14/26-6/28/26');
    } else {
      // Clear form for new registration
      setId('');
      setName('');
      setAge('');
      setRepresentative('');
      setCondition('Nuevo');
      setPreviousSeason('');
      setPaymentMethod('Seguro');
      setInsuranceName('Medicaid Waiver Summer (7424)');
      setPaymentAmount('8.31');
      setFiles([]);
      setRateCode('MW-Summer');
      setRateDescription('Medicaid Waiver Summer (7424)');
      setSessionNum('Camp1');
      setServicePeriod('6/14/26-6/28/26');
    }
    setErrors({});
  }, [camperToEdit, isOpen]);

  if (!isOpen) return null;

  // Form Validations
  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'El nombre completo es obligatorio';
    
    if (!id.trim()) {
      newErrors.id = 'El código o ID único es obligatorio';
    } else if (!camperToEdit) {
      // Check for duplicates only on creation
      const exists = existingCampers.some(c => c.id.toLowerCase().trim() === id.toLowerCase().trim());
      if (exists) newErrors.id = 'Este código o ID ya está registrado';
    }

    if (!age.trim() || isNaN(age) || parseInt(age) <= 0) {
      newErrors.age = 'Ingrese una edad válida';
    }
    
    if (!representative.trim()) newErrors.representative = 'El representante es obligatorio';
    
    if (condition === 'Reincorporado' && !previousSeason.trim()) {
      newErrors.previousSeason = 'Especifique el año o temporada anterior';
    }

    if (paymentMethod === 'Seguro' && !insuranceName.trim()) {
      newErrors.insuranceName = 'Especifique el nombre de la aseguradora o plan';
    }
    
    if (!paymentAmount.trim() || isNaN(paymentAmount) || parseFloat(paymentAmount) < 0) {
      newErrors.paymentAmount = 'Ingrese un monto de pago válido';
    }

    if (rateCode === 'Custom' && !rateDescription.trim()) {
      newErrors.rateDescription = 'Especifique la descripción de la tarifa';
    }

    if (sessionNum === 'Custom' && !servicePeriod.trim()) {
      newErrors.servicePeriod = 'Especifique el período de servicio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const camperData = {
      id: id.trim(),
      name: name.trim(),
      age: parseInt(age),
      representative: representative.trim(),
      condition,
      previousSeason: condition === 'Reincorporado' ? previousSeason.trim() : '',
      paymentMethod,
      insuranceName: paymentMethod === 'Seguro' ? insuranceName.trim() : '',
      paymentAmount: parseFloat(paymentAmount),
      rateCode,
      rateDescription,
      sessionNum,
      servicePeriod,
      files
    };

    onSave(camperData);
    onClose();
  };

  // Dropdown change handlers
  const handleRateCodeChange = (code) => {
    setRateCode(code);
    const selected = RATE_CODES.find(r => r.code === code);
    if (selected) {
      if (code !== 'Custom') {
        setRateDescription(selected.desc);
        setPaymentMethod(selected.method);
        setPaymentAmount(selected.amount.toString());
        if (selected.method === 'Seguro') {
          setInsuranceName(selected.desc);
        } else {
          setInsuranceName('');
        }
      } else {
        setRateDescription('');
        setPaymentMethod('Seguro');
        setPaymentAmount('');
        setInsuranceName('');
      }
    }
  };

  const handleSessionNumChange = (num) => {
    setSessionNum(num);
    const selected = SESSIONS.find(s => s.num === num);
    if (selected) {
      if (num !== 'Custom') {
        setServicePeriod(selected.period);
      } else {
        setServicePeriod('');
      }
    }
  };

  // Drag and Drop File Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString().split('T')[0]
    }));

    setFiles(prev => {
      const filtered = prev.filter(f => !newFiles.some(nf => nf.name === f.name));
      return [...filtered, ...newFiles];
    });
  };

  const removeFile = (fileName) => {
    setFiles(prev => prev.filter(f => f.name !== fileName));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
      
      {/* Modal Container */}
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh] animate-scale-up">
        
        {/* Header */}
        <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-display font-bold text-slate-800">
              {camperToEdit ? 'Editar Expediente de Campista' : 'Registrar Nuevo Campista'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Complete la información administrativa obligatoria y cargue sus documentos de soporte.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Column: Camper Profile Details */}
            <div className="space-y-5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                Datos del Campista
              </h3>

              {/* ID / Código único */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Código / ID Único (Cédula o correlativo)</label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="ej. CL-2026-10"
                  disabled={!!camperToEdit}
                  className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm transition-all ${
                    camperToEdit ? 'opacity-70 cursor-not-allowed text-slate-500 bg-slate-100 border-slate-200' : 'border-slate-200 text-slate-800'
                  } ${errors.id ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-100' : 'border-slate-200'}`}
                />
                {errors.id && <p className="text-rose-500 text-[11px] font-medium">{errors.id}</p>}
              </div>

              {/* Nombre completo */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Nombre Completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ej. Santiago Rodríguez"
                  className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm transition-all text-slate-800 ${
                    errors.name ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-100' : 'border-slate-200'
                  }`}
                />
                {errors.name && <p className="text-rose-500 text-[11px] font-medium">{errors.name}</p>}
              </div>

              {/* Edad */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Edad</label>
                <input
                  type="number"
                  min="0"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="ej. 25"
                  className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm transition-all text-slate-800 ${
                    errors.age ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-100' : 'border-slate-200'
                  }`}
                />
                {errors.age && <p className="text-rose-500 text-[11px] font-medium">{errors.age}</p>}
              </div>

              {/* Nombre de Representante */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Nombre del Representante</label>
                <input
                  type="text"
                  value={representative}
                  onChange={(e) => setRepresentative(e.target.value)}
                  placeholder="ej. Mariana Rodríguez"
                  className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm transition-all text-slate-800 ${
                    errors.representative ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-100' : 'border-slate-200'
                  }`}
                />
                {errors.representative && <p className="text-rose-500 text-[11px] font-medium">{errors.representative}</p>}
              </div>

            </div>

            {/* Right Column: Administrative & Payments */}
            <div className="space-y-5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                Datos Administrativos y Pago
              </h3>

              {/* Condición */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Condición del Campista</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 transition-all focus:border-camp-green"
                >
                  <option value="Nuevo">Nuevo</option>
                  <option value="Reincorporado">Reincorporado</option>
                </select>
              </div>

              {/* Condicional: Año / Temporada anterior */}
              {condition === 'Reincorporado' && (
                <div className="space-y-1.5 transition-all duration-300 animate-slide-down">
                  <label className="text-xs font-semibold text-slate-600">Año / Temporada Anterior</label>
                  <input
                    type="text"
                    value={previousSeason}
                    onChange={(e) => setPreviousSeason(e.target.value)}
                    placeholder="ej. Temporada 2025"
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm transition-all text-slate-800 ${
                      errors.previousSeason ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-100' : 'border-slate-200'
                    }`}
                  />
                  {errors.previousSeason && <p className="text-rose-500 text-[11px] font-medium">{errors.previousSeason}</p>}
                </div>
              )}

              {/* Session Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Sesión</label>
                  <select
                    value={sessionNum}
                    onChange={(e) => handleSessionNumChange(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 transition-all focus:border-camp-green"
                  >
                    {SESSIONS.map(s => (
                      <option key={s.num} value={s.num}>{s.num}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Período de Servicio</label>
                  <input
                    type="text"
                    value={servicePeriod}
                    onChange={(e) => setServicePeriod(e.target.value)}
                    disabled={sessionNum !== 'Custom'}
                    placeholder="ej. 6/14/26-6/28/26"
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm transition-all text-slate-800 ${
                      sessionNum !== 'Custom' ? 'bg-slate-100 text-slate-550 cursor-not-allowed border-slate-200' : 'bg-slate-55 border-slate-200'
                    } ${errors.servicePeriod ? 'border-rose-400 focus:border-rose-400' : ''}`}
                  />
                  {errors.servicePeriod && <p className="text-rose-500 text-[11px] font-medium">{errors.servicePeriod}</p>}
                </div>
              </div>

              {/* Rate Code selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Código de Tarifa (Rate Code)</label>
                <select
                  value={rateCode}
                  onChange={(e) => handleRateCodeChange(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 transition-all focus:border-camp-green"
                >
                  {RATE_CODES.map(r => (
                    <option key={r.code} value={r.code}>{r.code} ({r.desc})</option>
                  ))}
                </select>
              </div>

              {/* Rate Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Descripción de Tarifa (Rate Description)</label>
                <input
                  type="text"
                  value={rateDescription}
                  onChange={(e) => setRateDescription(e.target.value)}
                  disabled={rateCode !== 'Custom'}
                  placeholder="ej. Medicaid Waiver Summer (7424)"
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm transition-all text-slate-800 ${
                    rateCode !== 'Custom' ? 'bg-slate-100 text-slate-550 cursor-not-allowed border-slate-200' : 'bg-slate-55 border-slate-200'
                  } ${errors.rateDescription ? 'border-rose-400 focus:border-rose-400' : ''}`}
                />
                {errors.rateDescription && <p className="text-rose-500 text-[11px] font-medium">{errors.rateDescription}</p>}
              </div>

              {/* Método de Pago (Driven by Rate Code, but visible) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Método de Pago</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    disabled={rateCode !== 'Custom'}
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm text-slate-800 transition-all ${
                      rateCode !== 'Custom' ? 'bg-slate-100 text-slate-550 cursor-not-allowed border-slate-200' : 'bg-slate-55 border-slate-200'
                    }`}
                  >
                    <option value="Seguro">Seguro</option>
                    <option value="Privado">Privado</option>
                  </select>
                </div>

                {/* Monto de pago único / Tarifa */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Tarifa Facturable (USD)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 font-medium text-sm">
                      $
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      placeholder="ej. 8.31"
                      className={`w-full pl-8 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm transition-all text-slate-800 ${
                        errors.paymentAmount ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-100' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {errors.paymentAmount && <p className="text-rose-500 text-[11px] font-medium">{errors.paymentAmount}</p>}
                </div>
              </div>

              {/* Condicional: Nombre del Seguro */}
              {paymentMethod === 'Seguro' && (
                <div className="space-y-1.5 transition-all duration-300 animate-slide-down">
                  <label className="text-xs font-semibold text-slate-600">Nombre del Seguro / Programa</label>
                  <input
                    type="text"
                    value={insuranceName}
                    onChange={(e) => setInsuranceName(e.target.value)}
                    placeholder="ej. Seguros Caracas, BlueCross, etc."
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm transition-all text-slate-800 ${
                      errors.insuranceName ? 'border-rose-400 focus:border-rose-400 focus:ring-rose-100' : 'border-slate-200'
                    }`}
                  />
                  {errors.insuranceName && <p className="text-rose-500 text-[11px] font-medium">{errors.insuranceName}</p>}
                </div>
              )}

            </div>

          </div>

          {/* Files Dropzone Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
              Expediente Digital (Facturas, Autorizaciones, Fichas Médicas)
            </h3>
            
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-150 flex flex-col items-center justify-center ${
                dragActive 
                  ? 'border-camp-green bg-camp-green-light/40 text-camp-green-dark' 
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100/50 hover:border-slate-300 text-slate-500'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="p-3 bg-white rounded-xl shadow-sm text-camp-green mb-3 border border-slate-100">
                <Upload className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold text-slate-700">
                Arrastre archivos aquí o haga clic para buscar
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Soporta PDFs, Facturas en JPG/PNG, y Documentos médicos (carga virtual simulada)
              </p>
            </div>

            {/* List of files */}
            {files.length > 0 && (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2 mt-4 max-h-[160px] overflow-y-auto">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Documentos Cargados ({files.length})
                </p>
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="p-1.5 bg-camp-green-light rounded-lg text-camp-green shrink-0">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-700 truncate">
                          {file.name}
                        </p>
                        <p className="text-[10px] text-slate-400 flex items-center space-x-2">
                          <span>{formatFileSize(file.size)}</span>
                          <span>•</span>
                          <span>Cargado: {file.uploadDate}</span>
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(file.name);
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </form>

        {/* Footer Actions */}
        <div className="px-8 py-5 border-t border-slate-100 bg-slate-50/50 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-100 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-camp-green hover:bg-camp-green-dark text-white rounded-xl text-sm font-semibold shadow-md shadow-camp-green/10 flex items-center space-x-2 cursor-pointer"
          >
            <CheckCircle className="h-4 w-4" />
            <span>{camperToEdit ? 'Guardar Cambios' : 'Registrar Campista'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
