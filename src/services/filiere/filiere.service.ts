import { ApiResponse } from "@/models/api-response";
import { deleteData, getData, postData } from "../api/http-base.service";

export class FiliereService{

    async getFilieres(): Promise<ApiResponse>{
        let apiResponse: ApiResponse;
        try {
            apiResponse = await getData('filiere')
            // console.log( "response de l appel api", apiResponse)
            return apiResponse
        } catch (error) {
            return {
                success: false,
                message: 'Erreur de connexion veuillez réessayer plus tard',
                result: null,
                errors: "Erreur de connexion"
            };
        }
    }

    async addFiliere(data:any):Promise<ApiResponse> {
        let apiResponse: ApiResponse;
        try {
            apiResponse = await postData('filiere',data)
            // console.log( "response de l appel api", apiResponse)
            return apiResponse
        } catch (error) {
            return {
                success: false,
                message: 'Erreur de connexion veuillez réessayer plus tard',
                result: null,
                errors: "Erreur de connexion"
            };
        }
    }

    async deleteFiliere(filiereId: string): Promise<ApiResponse> {
        try {
            const apiResponse = await deleteData(`filiere/${filiereId}`);
            console.log("response de la suppression de role", apiResponse);
            return apiResponse;
        } catch (error) {
            return {
                success: false,
                message: 'Erreur lors de la suppression du role, veuillez réessayer plus tard',
                result: null,
                errors: "Erreur de connexion"
            };
        }
    }
}