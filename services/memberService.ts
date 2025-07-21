import { api, ApiResponse } from '@/lib/api';
import { 
  Member, 
  CreateMemberRequest, 
  UpdateMemberRequest,
  SearchFilter,
  PagedResult
} from '@/types/api';

export const memberService = {
  async getMembers(filter?: SearchFilter): Promise<PagedResult<Member>> {
    const params = new URLSearchParams();
    if (filter?.pageNumber) params.append('page', filter.pageNumber.toString());
    if (filter?.pageSize) params.append('pageSize', filter.pageSize.toString());
    if (filter?.searchTerm) params.append('search', filter.searchTerm);
    if (filter?.sortBy) params.append('sortBy', filter.sortBy);
    if (filter?.sortDescending) params.append('sortDescending', filter.sortDescending.toString());

    const response = await api.get<ApiResponse<PagedResult<Member>>>(`/Members?${params.toString()}`);
    return response.data;
  },

  async getMember(id: number): Promise<Member> {
    const response = await api.get<ApiResponse<Member>>(`/members/${id}`);
    return response.data;
  },

  async createMember(data: CreateMemberRequest): Promise<Member> {
    const response = await api.post<ApiResponse<Member>>('/Members', data);
    return response.data;
  },

  async updateMember(id: number, data: UpdateMemberRequest): Promise<Member> {
    const response = await api.put<ApiResponse<Member>>(`/members/${id}`, data);
    return response.data;
  },

  async deleteMember(id: number): Promise<void> {
    await api.delete<ApiResponse<void>>(`/members/${id}`);
  },

  async uploadProfileImage(id: number, file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.upload<ApiResponse<{ imageUrl: string }>>(`/members/${id}/profile-image`, formData);
    return response.data.imageUrl;
  },

  async getMembersBySpecialty(specialtyId: number): Promise<Member[]> {
    const response = await api.get<ApiResponse<Member[]>>(`/members/by-specialty/${specialtyId}`);
    return response.data;
  },

  async getMembersByHospital(hospitalId: number): Promise<Member[]> {
    const response = await api.get<ApiResponse<Member[]>>(`/members/by-hospital/${hospitalId}`);
    return response.data;
  },

  async getActiveMembers(): Promise<Member[]> {
    const response = await api.get<ApiResponse<Member[]>>('/members/active');
    return response.data;
  },

  async getPendingMembers(): Promise<Member[]> {
    const response = await api.get<ApiResponse<Member[]>>('/members/pending');
    return response.data;
  },

  async approveMember(id: number): Promise<void> {
    await api.post<ApiResponse<void>>(`/members/${id}/approve`);
  }
};