import { ApiResponse } from "@/models/api-response";
import { deleteData, getData, postData } from "../api/http-base.service";
import { FiliereDto } from "@/models";

export class FiliereService{

    async getFilieres(){
        let apiResponse: ApiResponse<FiliereDto[]>;
        try {
            apiResponse = await getData('filiere')
            return apiResponse
        } catch (error) {
            return {
                success: false,
                message: 'Erreur de connexion veuillez réessayer plus tard',
                errors: "Erreur de connexion"
            };
        }
    }

    async addFiliere(data:any) {
        let apiResponse: ApiResponse<FiliereDto>;
        try {
            apiResponse = await postData('filiere',data)
            return apiResponse
        } catch (error) {
            return {
                success: false,
                message: 'Erreur de connexion veuillez réessayer plus tard',
                errors: "Erreur de connexion"
            };
        }
    }

    async deleteFiliere(filiereId: string) {
        let apiResponse: ApiResponse<FiliereDto>;
        try {
            apiResponse = await deleteData(`filiere/${filiereId}`);
            return apiResponse;
        } catch (error) {
            return {
                success: false,
                message: 'Erreur lors de la suppression du role, veuillez réessayer plus tard',
                errors: "Erreur de connexion"
            };
        }
    }
}