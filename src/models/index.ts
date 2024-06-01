export interface User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    domaine: string;
    nationalite: string;
    roleId: number;
    status?: string;
    role?: Role;
    created_at?: Date;
    photoProfile: Blob;
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
