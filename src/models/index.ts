export interface User {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    domaine: string;
    nationalite: string;
    roleId: string;
    status?: string;
    // role?: RoleDto;
    created_at?: Date;
    photoProfile: Blob;
    password:string
}

export interface ApiNetwork {
    id: number;
    api_id: number;
    network_id: number;
    fees?: any;
    created_at: Date;
}

export interface RoleDto {
    id: string;
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

export interface MatiereModel{
    id: string;
    libelle: string;
    status: boolean;
    description: string
}

export interface AuthModel{
    user?: User;
    access_token?: any
}

export interface TokenModel{

}