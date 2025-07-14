import { api } from '@/lib/api';
import { 
  CMEPoint, 
  CreateCMEPointRequest,
  COGSRequest,
  CreateCOGSRequestRequest,
  SearchFilter,
  PagedResult,
  ApiResponse 
} from '@/types/api';

export const cmeService = {
  async getCMEPoints(filter?: SearchFilter): Promise<PagedResult<CMEPoint>> {
    const response = await api.get<ApiResponse<PagedResult<CMEPoint>>>('/cme/points', filter);
    return response.data;
  },

  async getMyCMEPoints(year?: number): Promise<CMEPoint[]> {
    const params = year ? { year } : undefined;
    const response = await api.get<ApiResponse<CMEPoint[]>>('/cme/my-points', params);
    return response.data;
  },

  async createCMEPoint(data: CreateCMEPointRequest): Promise<CMEPoint> {
    const response = await api.post<ApiResponse<CMEPoint>>('/cme/points', data);
    return response.data;
  },

  async updateCMEPoint(id: number, data: Partial<CreateCMEPointRequest>): Promise<CMEPoint> {
    const response = await api.put<ApiResponse<CMEPoint>>(`/cme/points/${id}`, data);
    return response.data;
  },

  async deleteCMEPoint(id: number): Promise<void> {
    await api.delete<ApiResponse<void>>(`/cme/points/${id}`);
  },

  async approveCMEPoint(id: number): Promise<void> {
    await api.post<ApiResponse<void>>(`/cme/points/${id}/approve`);
  },

  async rejectCMEPoint(id: number, reason: string): Promise<void> {
    await api.post<ApiResponse<void>>(`/cme/points/${id}/reject`, { reason });
  },

  async getMemberTotalPoints(memberId: number, year: number): Promise<number> {
    const response = await api.get<ApiResponse<{ totalPoints: number }>>(`/cme/members/${memberId}/total-points`, { year });
    return response.data.totalPoints;
  },

  async getMyTotalPoints(year: number): Promise<number> {
    const response = await api.get<ApiResponse<{ totalPoints: number }>>('/cme/my-total-points', { year });
    return response.data.totalPoints;
  },

  async getCOGSRequests(filter?: SearchFilter): Promise<PagedResult<COGSRequest>> {
    const response = await api.get<ApiResponse<PagedResult<COGSRequest>>>('/cme/cogs-requests', filter);
    return response.data;
  },

  async createCOGSRequest(data: CreateCOGSRequestRequest): Promise<COGSRequest> {
    const response = await api.post<ApiResponse<COGSRequest>>('/cme/cogs-requests', data);
    return response.data;
  },

  async approveCOGSRequest(id: number): Promise<void> {
    await api.post<ApiResponse<void>>(`/cme/cogs-requests/${id}/approve`);
  },

  async rejectCOGSRequest(id: number, reason: string): Promise<void> {
    await api.post<ApiResponse<void>>(`/cme/cogs-requests/${id}/reject`, { reason });
  },

  async uploadCertificate(pointId: number, file: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);
    await api.upload<ApiResponse<void>>(`/cme/points/${pointId}/certificate`, formData);
  }
};