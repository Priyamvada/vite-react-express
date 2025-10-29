import {axiosInstance as axios, isAxiosError} from './axiosInstance';
import { default as Cookies } from "js-cookie";

export interface LoginResponse {
  message: string;
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

export async function logout(): Promise<LoginResponse> {
  try {
    Object.keys(Cookies.get()).forEach(cookie => {
      Cookies.remove(cookie);
    });
    const response = await axios.get<LoginResponse>('/logout');
    return response.data;
  } catch (error) {
    let errorMessage = 'An unexpected error occurred.';
    if (isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message || 'Logout failed. Please try again.';
    }
    throw new Error(errorMessage);
  }
}

