

// Interfaz genérica que sirve para cualquier recurso paginado
export interface PaginatedResponse<T> {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: T[];
}

// <T> --> tipo genérico en TypeScript, plantilla flexible, permite utilizarla con datos de cualquier tipo.