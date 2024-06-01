import { ApiResponse } from "../../models/api-response";
import { getData, postData } from "../api/http-base.service";

export class AuthService {

    async register(registerDto: any) {
        let apiResponse: ApiResponse;
        try {
            apiResponse = await postData(`auth/login`, registerDto);
            if (apiResponse.success) {
                console.log(apiResponse.result)
            } else {
                return {
                    success: false,
                    message: apiResponse.message,
                    result: null,
                    errors: apiResponse.errors
                };
            }
        } catch (error) {
            return {
                success: false,
                message: 'Erreur de connexion veuillez réessayer plus tard',
                result: null,
                errors: "Erreur de connexion"
            };
        }
    }

    async login(loginDto: any): Promise<ApiResponse> {
        let apiResponse: ApiResponse;
        const requestBody = {
            "email":  loginDto.email, 
            "password":  loginDto.password, 
        }
        try {
            apiResponse = await postData('auth/login',requestBody);
            console.log("apiresponse ", apiResponse)
            if (apiResponse.success) {
                return apiResponse
            } else {
            console.log("apiresponse ", apiResponse)
                return {
                    success: false,
                    message: apiResponse.message,
                    result: [],
                    errors: apiResponse.errors
                };
            }
        } catch (error) {
            return {
                success: false,
                message: 'Erreur de connexion veuillez réessayer plus tard',
                result: null,
                errors: "Erreur de connexion"
            };
        }
    }

    async logout(): Promise<ApiResponse>{
        let apiResponse: ApiResponse;
        try {
            apiResponse = await getData('auth/logout');
            console.log("apiresponse ", apiResponse)
            if (apiResponse.success) {
                return apiResponse
            } else {
            console.log("apiresponse ", apiResponse)
                return {
                    success: false,
                    message: apiResponse.message,
                    result: [],
                    errors: apiResponse.errors
                };
            }
        } catch (error) {
            return {
                success: false,
                message: 'Erreur de connexion veuillez réessayer plus tard',
                result: null,
                errors: "Erreur de connexion"
            };
        }

    }

    async getPays(): Promise<ApiResponse>{
        let apiResponse: ApiResponse;
        try {
            apiResponse = await getData('sn86069873.json')
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

    
}