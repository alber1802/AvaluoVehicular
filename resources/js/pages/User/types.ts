export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}
