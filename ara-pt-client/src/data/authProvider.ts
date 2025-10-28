import {axiosInstance as axios, isAxiosError} from './axiosInstance';

export interface LoginResponse {
  message: string;
  token?: string; // Assuming a JWT token is returned
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>('/login', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    let errorMessage = 'An unexpected error occurred.';
    if (isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message || 'Login failed. Please try again.';
    }
    throw new Error(errorMessage);
  }
}

