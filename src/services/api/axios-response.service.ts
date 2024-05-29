import { ApiResponse } from "../../models/api-response";


export const retriveAxiosSuccessResponse = (res: ApiResponse) => {
    return {
        status: res.status,
        message: res.message,
        data: res.result,
        success: res.success,
        error: res.errors,
    }
};

export const retriveAxiosErrorResponse = (res: ApiResponse) => {
    if (res.status == 401) {
        location.href = "/";
    }
    return {
        status: res.status,
        message: res.message,
        data: res.result,
        success: res.success,
        error: res.errors
    }
};