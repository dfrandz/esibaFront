import { NiveauFiliere } from "@/models";
import { ApiResponse } from "@/models/api-response";
import { NiveauFiliereService } from "@/services/niveauFiliere/niveauFiliere.service";
import { proxy } from "valtio";

class NiveauStore{
    niveauFilieres: NiveauFiliere[]=[]

    niveauFiliererService = new NiveauFiliereService()

    async getAll(): Promise<ApiResponse | undefined>{
        try {
            const response = await this.niveauFiliererService.getFilieres();
            if (response.status) {
                const result = response.result;
                this.niveauFilieres = result
                return response
            }else{
                return {
                    success: false,
                    message: response?.message,
                    result: [],
                    errors: response?.errors
                };
            }
        } catch (error: any) {
            return {
                success: false,
                message: 'Erreur de connexion',
                result: [],
                errors: error,
            };

        }
    }

    async add(data:any) : Promise<ApiResponse>{
        try {
            const response = await this.niveauFiliererService.add(data);
            return response
        } catch (error: any) {
            return {
                success: false,
                message: 'Erreur de connexion',
                result: [],
                errors: error,
            };
        }
    }
}

const  niveauStore= proxy(new NiveauStore());
export default niveauStore;