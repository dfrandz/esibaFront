import { ApiResponse } from "@/models/api-response";
import { AuthService } from "@/services/auth/auth.service";
import { proxy } from "valtio";



class CounterStore{

    
    countA: number = 1;
    pays: [] = [];
    authService = new AuthService()

    async increment(): Promise<any>{
        this.countA +=1;
    }

    async getPays(): Promise<ApiResponse>{
        const response = await this.authService.getPays();
        const result = response.issues ;
        console.log(result)
        this.pays = result;
        return result;
    }
}
const  counterStore= proxy(new CounterStore());
export default counterStore;