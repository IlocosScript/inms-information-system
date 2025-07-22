import { api } from '@/lib/api';
import { 
  MembershipDue, 
  Payment,
  SearchFilter,
  PagedResult,
  ApiResponse 
} from '@/types/api';

export const duesService = {
  async getMyDues(year?: number): Promise<MembershipDue[]> {
    const params = year ? { year } : undefined;
    const response = await api.get<ApiResponse<MembershipDue[]>>('/dues/my-dues', params);
    return response.data;
  },

  async getAllDues(filter?: SearchFilter): Promise<PagedResult<MembershipDue>> {
    const response = await api.get<ApiResponse<PagedResult<MembershipDue>>>('/dues', filter);
    return response.data;
  },

  async createDue(data: {
    memberId: number;
    dueType: number;
    description: string;
    amount: number;
    year: number;
    dueDate: string;
  }): Promise<MembershipDue> {
    const response = await api.post<ApiResponse<MembershipDue>>('/dues', data);
    return response.data;
  },

  async payDue(dueId: number, paymentData: {
    paymentMethod: string;
    paymentReference: string;
  }): Promise<Payment> {
    const response = await api.post<ApiResponse<Payment>>(`/dues/${dueId}/pay`, paymentData);
    return response.data;
  },

  async getMyPayments(): Promise<Payment[]> {
    const response = await api.get<ApiResponse<Payment[]>>('/dues/my-payments');
    return response.data;
  },

  async getAllPayments(filter?: SearchFilter): Promise<PagedResult<Payment>> {
    const response = await api.get<ApiResponse<PagedResult<Payment>>>('/dues/payments', filter);
    return response.data;
  },

  async downloadReceipt(paymentId: number): Promise<Blob> {
    const response = await api.get<Blob>(`/dues/payments/${paymentId}/receipt`, { responseType: 'blob' });
    return response as Blob;
  },

  async getMemberDuesStatus(memberId: number, year: number): Promise<{
    totalDues: number;
    paidAmount: number;
    pendingAmount: number;
    isCompliant: boolean;
  }> {
    const response = await api.get<ApiResponse<any>>(`/dues/members/${memberId}/status`, { year });
    return response.data;
  }
};