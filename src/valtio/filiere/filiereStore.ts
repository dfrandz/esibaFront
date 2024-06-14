import { FiliereDto } from "@/models";
import { ApiResponse } from "@/models/api-response";
import { FiliereService } from "@/services/filiere/filiere.service";
import { proxy } from "valtio";


class FiliereStore{
    filieres:FiliereDto[] = []
    filiereService = new FiliereService()

    async getFilieres() {
        try {
            const response = await this.filiereService.getFilieres();
            if (response.status) {
                console.log("response valtio role2", response.result)
                const result = response.result;
                this.filieres = result
                console.log("this.role", this.filieres)
                return response.result
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

    async addFiliere(data:any) : Promise<ApiResponse>{
        try {
            const response = await this.filiereService.addFiliere(data);
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

    async deleteFiliere(filiereId:any): Promise<ApiResponse>{
        try {
            const response = await this.filiereService.deleteFiliere(filiereId);
            if (response.success) {
                console.log("response delete role", response)
                // Filter out the deleted role from the local state
                this.filieres = this.filieres.filter((filiere:any) => filiere.id !== filiereId);
                return response;
            } else {
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
}

const  filiereStore= proxy(new FiliereStore());
export default filiereStore;