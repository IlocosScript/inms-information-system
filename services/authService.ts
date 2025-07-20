import { api, ApiResponse } from '@/lib/api';
import { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RefreshTokenRequest, 
  ChangePasswordRequest,
  Member,
  User
} from '@/types/api';

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>('/Auth/login', credentials);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<void> {
    await api.post<ApiResponse<void>>('/auth/register', data);
  },

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/refresh-token', { refreshToken });
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post<ApiResponse<void>>('/auth/revoke-token');
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<ApiResponse<User>>('/auth/profile');
    return response.data;
  },

  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await api.post<ApiResponse<void>>('/auth/change-password', data);
  },

  async forgotPassword(email: string): Promise<void> {
    await api.post<ApiResponse<void>>('/auth/forgot-password', { email });
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    await api.post<ApiResponse<void>>('/auth/reset-password', { token, newPassword });
  },

  async verifyEmail(token: string): Promise<void> {
    await api.post<ApiResponse<void>>('/auth/verify-email', { token });
  },

  async resendVerificationEmail(): Promise<void> {
    await api.post<ApiResponse<void>>('/auth/resend-verification');
  }
};