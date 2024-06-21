import { FiliereDto } from "@/models";
import { ApiResponse } from "@/models/api-response";
import { FiliereService } from "@/services/filiere/filiere.service";
import { proxy } from "valtio";


class FiliereStore{
    filieres:FiliereDto[] = []
    filiereService = new FiliereService()

    async getFilieres() {
        let response: ApiResponse<FiliereDto[]>
        try {
            response = await this.filiereService.getFilieres();
            if (response.status) {
                console.log("response valtio role2", response.result)
                const result = response?.result;
                this.filieres = result ? result : []
                console.log("this.role", this.filieres)
                return response
            }else{
                return {
                    success: false,
                    message: response?.message,
                    errors: response?.errors
                };
            }
        } catch (error: any) {
            return {
                success: false,
                message: 'Erreur de connexion',
                errors: error,
            };

        }
    }

    async addFiliere(data:any){
        let response: ApiResponse<FiliereDto>
        try {
            response = await this.filiereService.addFiliere(data);
            return response
        } catch (error: any) {
            return {
                success: false,
                message: 'Erreur de connexion',
                errors: error,
            };
        }
    }

    async deleteFiliere(filiereId:any){
        let response: ApiResponse<FiliereDto>
        try {
            response = await this.filiereService.deleteFiliere(filiereId);
            if (response.success) {
                console.log("response delete role", response)
                // Filter out the deleted role from the local state
                this.filieres = this.filieres.filter((filiere:any) => filiere.id !== filiereId);
                return response;
            } else {
                return {
                    success: false,
                    message: response?.message,
                    errors: response?.errors
                };
            }
        } catch (error: any) {
            return {
                success: false,
                message: 'Erreur de connexion',
                errors: error,
            };
        }
    }
}

const  filiereStore= proxy(new FiliereStore());
export default filiereStore;