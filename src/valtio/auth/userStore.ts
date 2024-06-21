import { convertToTime } from "@/helpers/myfunc";
import { AuthModel, User } from "@/models";
import { ApiResponse } from "@/models/api-response";
import { AuthService } from "@/services/auth/auth.service";
import { proxy } from "valtio";

interface LoginResult {
    user: User;
    access_token: {
        token: string;
    };
}

class UserStore {
    isAuthenticated: boolean = false;
    user: User = {} as User;
    token: string = '';
    authService = new AuthService()

    constructor() {
        console.log("state constructor")
        // Récupérer l'état initial du localStorage lors de la création de l'instance
        const storedState = localStorage.getItem('authStoreState');
        if (storedState) {
            const initialState = JSON.parse(storedState);
            this.isAuthenticated = initialState.isAuthenticated;
            this.user = initialState.user;
            this.token = initialState.token;
        }
        // Assurer que les méthodes sont liées à l'instance actuelle
        this.setAuthState = this.setAuthState.bind(this);
        this.login = this.login.bind(this);
        // this.logout = this.logout.bind(this);
    }

    private setAuthState(user: any, token: string): void {
        this.isAuthenticated = true;
        this.user = user;
        this.token = token;

        // Mettre à jour localStorage lors du changement d'état
        localStorage.setItem('authStoreState',JSON.stringify(this));
    }

    async login(loginDto: any) {
        let response: ApiResponse<AuthModel>
        try {
            response = await this.authService.login(loginDto);
            if (response?.success && response.result && !Array.isArray(response.result)) {
                const result = response.result;
                console.log('valtio auth res', result.access_token)
                // const { email, ...filteredData } = result.user
                this.setAuthState(result.user, result.access_token.token)
                // this.user = result.user;
                // this.token = result.access_token.token;
                localStorage.setItem('user', JSON.stringify(this.user));
                localStorage.setItem('token', JSON.stringify(this.token));
                const expirationTime = new Date(Date.now() + 8 * 60 * 60 * 1000).toUTCString();
                const tokenExpiration = convertToTime(expirationTime) as any;
                localStorage.setItem('tokenExpiration', tokenExpiration);
                return response
            }else{
                return {
                    success: false,
                    message: response?.message,
                    result: response.result,
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
    
    async logout() {
        let response: ApiResponse<AuthModel>
        try {
            response = await this.authService.logout();
            if (response?.success) {
                this.isAuthenticated = false;
                this.user = {} as User;
                this.token = '';
                localStorage.removeItem('authStoreState');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('tokenExpiration');
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
}


const  userStore= proxy(new UserStore());
export default userStore;