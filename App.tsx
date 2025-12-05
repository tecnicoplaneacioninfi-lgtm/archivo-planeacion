import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { AlistamientoView } from './views/Alistamiento';
import { DocumentosView } from './views/Documentos';
import { SeguimientoView } from './views/Seguimiento';
import { InventarioView } from './views/Inventario';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('alistamiento');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case 'alistamiento': return <AlistamientoView />;
      case 'documentos': return <DocumentosView />;
      case 'seguimiento': return <SeguimientoView />;
      case 'inventario': return <InventarioView />;
      default: return <AlistamientoView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans text-gray-800">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen}
      />

      {/* Main Content Area */}
      <main 
        className={`
          flex-1 flex flex-col h-full transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'ml-64' : 'ml-20'}
        `}
      >
        {/* Top Header */}
        <header className="h-20 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-bold text-corporate-blue">Sistema de Gestión Documental</h1>
              <p className="text-xs text-corporate-green font-semibold tracking-wide">OFICINA DE PLANEACIÓN</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
               <p className="text-sm font-semibold text-gray-700">Administrador</p>
               <p className="text-xs text-green-600">En línea</p>
             </div>
             <div className="h-10 w-10 rounded-full bg-corporate-blue text-white flex items-center justify-center font-bold shadow-lg ring-2 ring-white">
               AD
             </div>
          </div>
        </header>

        {/* Dynamic Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto animate-fadeIn">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;