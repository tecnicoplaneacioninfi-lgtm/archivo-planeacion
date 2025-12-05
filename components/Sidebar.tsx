import React from 'react';

type Props = {
	activeTab: string;
	setActiveTab: (tab: string) => void;
	isOpen: boolean;
	isMobile?: boolean;
};

export const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab, isOpen, isMobile = false }) => {
	const items = [
		{ key: 'alistamiento', label: 'Alistamiento', icon: '📁' },
		{ key: 'documentos', label: 'Documentos', icon: '📄' },
		{ key: 'seguimiento', label: 'Seguimiento', icon: '🔎' },
		{ key: 'inventario', label: 'Inventario', icon: '📦' },
		{ key: 'normatividad', label: 'Normatividad', icon: '📜' },
	];

	return (
		<aside
			className={`
				${isMobile ? 'fixed' : 'relative'} 
				left-0 top-0 h-full bg-white border-r border-gray-200  
				${isMobile ? 'z-40' : 'z-10'}
				transition-all duration-300 ease-in-out overflow-hidden shadow-lg md:shadow-none

				/* CAMBIO IMPORTANTE: Ya no es fixed en desktop */
				${isOpen ? 'w-64' : 'w-20 md:w-20'}
			`}
		>
			{/* Header del Sidebar */}
			<div className={`h-16 md:h-20 flex items-center px-3 md:px-4 gap-3 border-b border-gray-100 ${!isOpen && !isMobile ? 'justify-center' : ''}`}>
				<img
					src="/logo.png"
					alt="Logo Planeación"
					className={`object-contain flex-shrink-0 ${isOpen || isMobile ? 'h-10 w-10 md:h-12 md:w-12' : 'h-8 w-8'}`}
				/>
				{(isOpen || isMobile) && (
					<div className="min-w-0 flex-1">
						<h2 className="text-xs md:text-sm font-bold truncate">Archivo Planeación</h2>
						<p className="text-[10px] md:text-xs text-gray-500 truncate">Menú</p>
					</div>
				)}
			</div>

			{/* Navigation */}
			<nav className="mt-4 md:mt-6 px-2 space-y-1">
				{items.map(it => {
					const isActive = activeTab === it.key;
					return (
						<button
							key={it.key}
							onClick={() => setActiveTab(it.key)}
							className={`
								w-full text-left flex items-center gap-3 px-3 py-2.5 md:py-3 rounded-lg
								${isActive ? 'bg-corporate-blue text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}
								transition-all duration-150 group relative
								${!isOpen && !isMobile ? 'justify-center' : ''}
							`}
							title={!isOpen && !isMobile ? it.label : ''}
						>
							<span className="text-lg md:text-xl flex-shrink-0">{it.icon}</span>

							{(isOpen || isMobile) && (
								<span className="font-medium text-xs md:text-sm truncate flex-1">
									{it.label}
								</span>
							)}

							{/* Tooltip */}
							{!isOpen && !isMobile && (
								<div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
									{it.label}
								</div>
							)}
						</button>
					);
				})}
			</nav>

			{/* Footer móvil */}
			{isMobile && isOpen && (
				<div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-gray-50">
					<p className="text-xs text-gray-500 text-center">
						Versión 1.0
					</p>
				</div>
			)}
		</aside>
	);
};
