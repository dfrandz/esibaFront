import { RoleDto } from "@/models";
import { ApiResponse } from "../../models/api-response";
import { getData, postData, deleteData, postDataWithToken } from "../api/http-base.service";

export class RoleService {

    async getRoles(){
        let apiResponse: ApiResponse<RoleDto[]>;
        try {
            apiResponse = await getData('roles')
            return apiResponse
        } catch (error) {
            return {
                success: false,
                message: 'Erreur de connexion veuillez réessayer plus tard',
                errors: "Erreur de connexion"
            };
        }
    }

    async addRole(data: any) {
        let apiResponse: ApiResponse<RoleDto>
        try {
            apiResponse = await postDataWithToken('roleStore', data);
            return apiResponse;
        } catch (error) {
            return {
                success: false,
                message: 'Erreur lors de l\'ajout du role, veuillez réessayer plus tard',
                errors: "Erreur de connexion"
            };
        }
    }

    async deleteRole(roleId: string) {
        let apiResponse: ApiResponse<RoleDto>
        try {
            apiResponse = await deleteData(`roleDelete/${roleId}`);
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