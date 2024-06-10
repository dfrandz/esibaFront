export interface ApiResponse{
    success: boolean,
    message?: string,
    result: any,
    errors?: any,
    except?: string,
    status?: number
  }