import { ApiResponse } from "@/models/api-response";
import { getData, postData } from "../api/http-base.service";
import { NiveauFiliere } from "@/models";

export class NiveauFiliereService{
    async getFilieres(){
        let apiResponse: ApiResponse<NiveauFiliere[]>;
        try {
            apiResponse = await getData('niveau-filiere')
            // console.log( "response de l appel api", apiResponse)
            return apiResponse
        } catch (error) {
            return {
                success: false,
                message: 'Erreur de connexion veuillez réessayer plus tard',
                errors: "Erreur de connexion"
            };
        }
    }

    async add(data:any) {
        let apiResponse: ApiResponse<NiveauFiliere>;
        try {
            apiResponse = await postData('niveau-filiere',data)
            return apiResponse
        } catch (error) {
            return {
                success: false,
                message: 'Erreur de connexion veuillez réessayer plus tard',
                errors: "Erreur de connexion"
            };
        }
    }
}