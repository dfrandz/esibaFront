export interface ApiResponse<T>{
    success: boolean,
    message?: any,
    result?: T,
    errors?: any,
    except?: string,
    status?: number
  }