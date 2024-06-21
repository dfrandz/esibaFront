import { RoleDto } from "@/models";
import { ApiResponse } from "@/models/api-response";
import { RoleService } from "@/services/role/role.service";
import { proxy } from "valtio";
class RoleStore {
    role: RoleDto[] = []

    roleService = new RoleService()

    async getRoles(){
        let response: ApiResponse<RoleDto[]>
        try {
            response = await this.roleService.getRoles();
            if (response.status) {
                console.log("response valtio role2", response.result)
                const result = response.result;
                this.role = result ? result : []
                console.log("this.role", this.role)
                return response.result
            }else{
                return response.result
            }
        } catch (error) {
            return []
        }
    }

    async addRole(data: any){
        let response: ApiResponse<RoleDto>;
        try {
            response = await this.roleService.addRole(data);
            return response.result
        } catch (error: any) {
            return []
        }
    }

    async deleteRole(roleId: string) {
        try {
            const response = await this.roleService.deleteRole(roleId);
            if (response.success) {
                console.log("response delete role", response)
                // Filter out the deleted role from the local state
                this.role = this.role.filter((role:any) => role.id !== roleId);
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


const  roleStore= proxy(new RoleStore());
export default roleStore;