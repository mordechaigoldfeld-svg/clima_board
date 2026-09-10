import axios from "axios"


export const instance = axios.create({
    baseURL:'http://localhost:8000',
    timeout:5000,
})


export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        return error.response?.data?.detail || error.message;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return "server error";
}