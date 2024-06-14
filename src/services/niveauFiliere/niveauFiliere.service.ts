import { ApiResponse } from "@/models/api-response";
import { getData, postData } from "../api/http-base.service";

export class NiveauFiliereService{
    async getFilieres(): Promise<ApiResponse>{
        let apiResponse: ApiResponse;
        try {
            apiResponse = await getData('niveau-filiere')
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

    async add(data:any):Promise<ApiResponse> {
        let apiResponse: ApiResponse;
        try {
            apiResponse = await postData('niveau-filiere',data)
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
}