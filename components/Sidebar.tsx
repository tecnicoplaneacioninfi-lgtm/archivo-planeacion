import React from 'react';

type Props = {
	activeTab: string;
	setActiveTab: React.Dispatch<React.SetStateAction<string>>;
	isOpen: boolean;
};

export const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab, isOpen }) => {
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
				fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-20
				transition-all duration-300 ease-in-out overflow-hidden
				${isOpen ? 'w-64' : 'w-20'}
			`}
		>
			<div className="h-20 flex items-center px-4 gap-3">
				<img
					src="/logo.png"
					alt="Logo Planeación"
					className="h-12 w-12 object-contain"
				/>
				{isOpen && <div>
					<h2 className="text-sm font-bold">Archivo Planeación</h2>
					<p className="text-xs text-gray-500">Menú</p>
				</div>}
			</div>

			<nav className="mt-6 px-2">
				{items.map(it => {
					const isActive = activeTab === it.key;
					return (
						<button
							key={it.key}
							onClick={() => setActiveTab(it.key)}
							className={`
								w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg
								${isActive ? 'bg-corporate-blue text-white' : 'text-gray-700 hover:bg-gray-100'}
								transition-colors duration-150
							`}
						>
							<span className="text-lg">{it.icon}</span>
							{isOpen && <span className="font-medium">{it.label}</span>}
						</button>
					);
				})}
			</nav>
		</aside>
	);
};
