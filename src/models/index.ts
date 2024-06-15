export interface User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    domaine: string;
    nationalite: string;
    roleId: number;
    status?: string;
    role?: RoleDto;
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

export interface RoleDto {
    id: number;
    libelle: string;
    description?: string;
    created_at: Date;
    status: boolean;
}

export interface Matiere{

}

export interface FiliereDto{
    id: string;
    libelle: string;
    status: boolean;
    description: string
}

export interface NiveauFiliere{
    id: number;
    libelle: string;
    status: boolean;
    description: string;
    filiereId: FiliereDto;
}
