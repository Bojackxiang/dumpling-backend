import { Response } from 'express';
// Helpers

// Generic typed response, we omit 'json' and we add a new json method with the desired parameter type
type TypedResponse<T> = Omit<Response, 'json'> & { json(data: T): Response };
// An example of a typed response
export type AppResponse = TypedResponse<{
    success: boolean;
    code: number;
    message?: string;
    data?: any;
    error?: string;
}>;
