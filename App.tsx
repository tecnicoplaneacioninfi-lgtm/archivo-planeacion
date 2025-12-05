import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { AlistamientoView } from './views/Alistamiento';
import { DocumentosView } from './views/Documentos';
import { SeguimientoView } from './views/Seguimiento';
import { InventarioView } from './views/Inventario';
import { NormatividadView } from './views/Normatividad';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('alistamiento');
  // En desktop (>=768px) inicia abierto, en mobile cerrado
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // En desktop, abrir sidebar automáticamente
      if (!mobile) {
        setIsSidebarOpen(true);
      } else {
        // En mobile, cerrar para no obstruir
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'alistamiento': return <AlistamientoView />;
      case 'documentos': return <DocumentosView />;
      case 'seguimiento': return <SeguimientoView />;
      case 'inventario': return <InventarioView />;
      case 'normatividad': return <NormatividadView />;
      default: return <AlistamientoView />;
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // En mobile, cerrar sidebar automáticamente al seleccionar
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans text-gray-800">
      {/* Overlay para mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        isOpen={isSidebarOpen}
        isMobile={isMobile}
      />

      {/* Main Content Area */}
      <main
        className={`
          flex-1 flex flex-col h-full transition-all duration-300 ease-in-out min-w-0
        `}
      >
        {/* Top Header */}
        <header className="min-h-[4rem] md:h-20 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-3 sm:px-4 md:px-8 z-10 flex-wrap gap-2">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 focus:outline-none flex-shrink-0"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <img
              src="/logo.png"
              alt="Logo"
              className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h1 className="text-sm sm:text-base md:text-xl font-bold text-corporate-blue truncate">
                Sistema de Gestión Documental
              </h1>
              <p className="text-[10px] sm:text-xs text-corporate-green font-semibold tracking-wide truncate">
                OFICINA DE PLANEACIÓN
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <div className="text-right hidden lg:block">
              <p className="text-sm font-semibold text-gray-700">Administrador</p>
              <p className="text-xs text-green-600">En línea</p>
            </div>
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-corporate-blue text-white flex items-center justify-center font-bold shadow-lg ring-2 ring-white text-xs sm:text-sm">
              AD
            </div>
          </div>
        </header>

        {/* Dynamic Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto animate-fadeIn">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;