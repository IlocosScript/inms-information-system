import { api, ApiResponse } from '@/lib/api';
import { Specialty, SearchFilter, PagedResult } from '@/types/api';

export interface CreateSpecialtyRequest {
  name: string;
  description: string;
}

export interface UpdateSpecialtyRequest {
  name?: string;
  description?: string;
  isActive?: boolean;
}

export const specialtyService = {
  async getSpecialties(filter?: SearchFilter): Promise<PagedResult<Specialty>> {
    const params = new URLSearchParams();
    if (filter?.pageNumber) params.append('page', filter.pageNumber.toString());
    if (filter?.pageSize) params.append('pageSize', filter.pageSize.toString());
    if (filter?.searchTerm) params.append('search', filter.searchTerm);
    if (filter?.sortBy) params.append('sortBy', filter.sortBy);
    if (filter?.sortDescending) params.append('sortDescending', filter.sortDescending.toString());

    const response = await api.get<ApiResponse<PagedResult<Specialty>>>(`/Specialty?${params.toString()}`);
    return response.data;
  },

  async getSpecialty(id: number): Promise<Specialty> {
    const response = await api.get<ApiResponse<Specialty>>(`/specialty/${id}`);
    return response.data;
  },

  async createSpecialty(data: CreateSpecialtyRequest): Promise<Specialty> {
    const response = await api.post<ApiResponse<Specialty>>('/specialty', data);
    return response.data;
  },

  async updateSpecialty(id: number, data: UpdateSpecialtyRequest): Promise<Specialty> {
    const response = await api.put<ApiResponse<Specialty>>(`/specialty/${id}`, data);
    return response.data;
  },

  async deleteSpecialty(id: number): Promise<void> {
    await api.delete<ApiResponse<void>>(`/specialty/${id}`);
  },

  async toggleSpecialtyStatus(id: number, isActive: boolean): Promise<Specialty> {
    // First get the current specialty data
    const currentSpecialty = await this.getSpecialty(id);
    
    // Update with the new status while preserving other fields
    const updateData = {
      name: currentSpecialty.name,
      description: currentSpecialty.description || '',
      isActive: isActive
    };
    
    const response = await api.put<ApiResponse<Specialty>>(`/specialty/${id}`, updateData);
    return response.data;
  }
}; 