export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    role_id: number;
    country_id?: number;
    franchise_id?: number;
    devices?: any[];
    status?: string;
    role?: Role;
    created_at?: Date;
}


export interface ApiNetwork {
    id: number;
    api_id: number;
    network_id: number;
    fees?: any;
    created_at: Date;
}

export interface Role {
    id: number;
    name: string;
    description?: string;
    created_at: Date;
}
