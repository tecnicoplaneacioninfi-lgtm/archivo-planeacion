// Hooks y utilidades para diseño responsive

/**
 * Hook para detectar el tamaño de pantalla
 * @returns objeto con información sobre el tamaño actual
 */
export const useResponsive = () => {
    const [screenSize, setScreenSize] = React.useState({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        width: 0
    });

    React.useEffect(() => {
        const updateScreenSize = () => {
            const width = window.innerWidth;
            setScreenSize({
                isMobile: width < 768,
                isTablet: width >= 768 && width < 1024,
                isDesktop: width >= 1024,
                width
            });
        };

        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);
        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

    return screenSize;
};

/**
 * Clases de Tailwind para layouts responsive comunes
 */
export const responsiveClasses = {
    // Contenedores
    container: 'w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8',
    containerFluid: 'w-full px-3 sm:px-4 md:px-6 lg:px-8',

    // Grids
    grid1to2: 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6',
    grid1to3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6',
    grid1to4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6',

    // Textos
    title: 'text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold',
    subtitle: 'text-base sm:text-lg md:text-xl font-semibold',
    body: 'text-sm sm:text-base',
    small: 'text-xs sm:text-sm',

    // Espaciado
    padding: 'p-3 sm:p-4 md:p-6 lg:p-8',
    paddingX: 'px-3 sm:px-4 md:px-6 lg:px-8',
    paddingY: 'py-3 sm:py-4 md:py-6 lg:py-8',
    margin: 'm-3 sm:m-4 md:m-6 lg:m-8',
    gap: 'gap-3 sm:gap-4 md:gap-6',

    // Botones
    button: 'px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base',
    buttonSmall: 'px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm',

    // Cards
    card: 'rounded-lg shadow-md p-4 sm:p-6 md:p-8',
    cardCompact: 'rounded-lg shadow-md p-3 sm:p-4 md:p-6',

    // Tablas
    tableWrapper: 'overflow-x-auto -mx-3 sm:mx-0',
    tableCell: 'px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm',
    tableHeader: 'px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold',
};

/**
 * Función helper para truncar texto
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

/**
 * Función para obtener clases responsive basadas en el tamaño de pantalla
 */
export const getResponsiveClass = (mobile: string, tablet?: string, desktop?: string): string => {
    const classes = [mobile];
    if (tablet) classes.push(`md:${tablet}`);
    if (desktop) classes.push(`lg:${desktop}`);
    return classes.join(' ');
};

/**
 * Breakpoints para usar en JavaScript
 */
export const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
};

/**
 * Helper para detectar si estamos en mobile
 */
export const isMobileDevice = (): boolean => {
    return window.innerWidth < breakpoints.md;
};

/**
 * Helper para detectar si estamos en tablet
 */
export const isTabletDevice = (): boolean => {
    return window.innerWidth >= breakpoints.md && window.innerWidth < breakpoints.lg;
};

/**
 * Helper para detectar si estamos en desktop
 */
export const isDesktopDevice = (): boolean => {
    return window.innerWidth >= breakpoints.lg;
};

// Importar React si no está disponible
import React from 'react';
