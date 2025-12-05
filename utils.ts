// Utility functions for the application

/**
 * Format date to YYYY-MM-DD
 */
export function formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Format date to DD/MM/YYYY for display
 */
export function formatDateDisplay(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
}

/**
 * Get current date in YYYY-MM-DD format
 */
export function getCurrentDate(): string {
    return formatDate(new Date());
}

/**
 * Validate required fields in form data
 */
export function validateRequired(data: Record<string, any>, fields: string[]): string[] {
    const errors: string[] = [];
    fields.forEach(field => {
        if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
            errors.push(`El campo ${field} es requerido`);
        }
    });
    return errors;
}

/**
 * Export data to CSV
 */
export function exportToCSV(data: any[], filename: string): void {
    if (data.length === 0) {
        alert('No hay datos para exportar');
        return;
    }

    // Get headers from first object
    const headers = Object.keys(data[0]);

    // Create CSV content
    let csv = headers.join(',') + '\n';

    data.forEach(row => {
        const values = headers.map(header => {
            const value = row[header];
            // Escape commas and quotes
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        });
        csv += values.join(',') + '\n';
    });

    // Download file
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Export data to Excel
 */
export async function exportToExcel(data: any[], filename: string): Promise<void> {
    if (data.length === 0) {
        alert('No hay datos para exportar');
        return;
    }

    try {
        // Dynamic import to avoid bundling xlsx if not used
        const XLSX = await import('xlsx');

        // Create worksheet from data
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Create workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, `${filename}.xlsx`);
    } catch (error) {
        console.error('Error exporting to Excel:', error);
        alert('Error al exportar a Excel. Usando exportación a CSV como alternativa.');
        exportToCSV(data, filename);
    }
}

/**
 * Filter array by search term (searches in all string fields)
 */
export function filterBySearch<T extends Record<string, any>>(
    items: T[],
    searchTerm: string
): T[] {
    if (!searchTerm.trim()) return items;

    const lowerSearch = searchTerm.toLowerCase();
    return items.filter(item =>
        Object.values(item).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(lowerSearch)
        )
    );
}

/**
 * Get badge color class based on status
 */
export function getStatusBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
        case 'pendiente':
            return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        case 'en proceso':
            return 'bg-blue-100 text-blue-800 border-blue-300';
        case 'completado':
            return 'bg-green-100 text-green-800 border-green-300';
        case 'prestado':
            return 'bg-orange-100 text-orange-800 border-orange-300';
        case 'devuelto':
            return 'bg-green-100 text-green-800 border-green-300';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-300';
    }
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Generate unique ID (simple version, for demo purposes)
 */
export function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
