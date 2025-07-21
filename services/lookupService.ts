import { api, ApiResponse } from '@/lib/api';
import { Specialty, Hospital, PagedResult } from '@/types/api';

export const lookupService = {
  async getSpecialties(page: number = 1, pageSize: number = 10): Promise<PagedResult<Specialty>> {
    const response = await api.get<ApiResponse<PagedResult<Specialty>>>(`/Lookup/specialties?page=${page}&pageSize=${pageSize}`);
    return response.data;
  },

  async getHospitals(page: number = 1, pageSize: number = 10): Promise<PagedResult<Hospital>> {
    const response = await api.get<ApiResponse<PagedResult<Hospital>>>(`/Lookup/hospitals?page=${page}&pageSize=${pageSize}`);
    return response.data;
  },

  async createSpecialty(data: { name: string; description?: string }): Promise<Specialty> {
    const response = await api.post<ApiResponse<Specialty>>('/lookup/specialties', data);
    return response.data;
  },

  async updateSpecialty(id: number, data: { name?: string; description?: string; isActive?: boolean }): Promise<Specialty> {
    const response = await api.put<ApiResponse<Specialty>>(`/lookup/specialties/${id}`, data);
    return response.data;
  },

  async createHospital(data: { 
    name: string; 
    address?: string; 
    phone?: string; 
    email?: string; 
    website?: string; 
  }): Promise<Hospital> {
    const response = await api.post<ApiResponse<Hospital>>('/lookup/hospitals', data);
    return response.data;
  },

  async updateHospital(id: number, data: { 
    name?: string; 
    address?: string; 
    phone?: string; 
    email?: string; 
    website?: string; 
    isActive?: boolean; 
  }): Promise<Hospital> {
    const response = await api.put<ApiResponse<Hospital>>(`/lookup/hospitals/${id}`, data);
    return response.data;
  }
};