export interface ApiResponse{
    success: boolean,
    message: string,
    result: any,
    errors?: any,
    except?: string | undefined,
    status?: number| undefined
  }