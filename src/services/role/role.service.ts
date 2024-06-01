import { ApiResponse } from "../../models/api-response";
import { getData, postData, deleteData } from "../api/http-base.service";

export class RoleService {

    async getRoles(): Promise<ApiResponse>{
        let apiResponse: ApiResponse;
        try {
            apiResponse = await getData('roles')
            console.log( "response de l appel api", apiResponse)
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

    async addRole(data: any): Promise<ApiResponse> {
        try {
            const apiResponse = await postData('roleStore', data);
            console.log("response de l'ajout de role", apiResponse);
            return apiResponse;
        } catch (error) {
            return {
                success: false,
                message: 'Erreur lors de l\'ajout du role, veuillez réessayer plus tard',
                result: null,
                errors: "Erreur de connexion"
            };
        }
    }

    async deleteRole(roleId: string): Promise<ApiResponse> {
        try {
            const apiResponse = await deleteData(`roleDelete/${roleId}`);
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