import { api } from '@/lib/api';
import { 
  Message, 
  CreateMessageRequest,
  SearchFilter,
  PagedResult,
  ApiResponse 
} from '@/types/api';

export const messageService = {
  async getMessages(filter?: SearchFilter): Promise<PagedResult<Message>> {
    const response = await api.get<ApiResponse<PagedResult<Message>>>('/messages', filter);
    return response.data;
  },

  async getConversations(): Promise<Message[]> {
    const response = await api.get<ApiResponse<Message[]>>('/messages/conversations');
    return response.data;
  },

  async getConversation(memberId: number): Promise<Message[]> {
    const response = await api.get<ApiResponse<Message[]>>(`/messages/conversations/${memberId}`);
    return response.data;
  },

  async sendMessage(data: CreateMessageRequest): Promise<Message> {
    const response = await api.post<ApiResponse<Message>>('/messages', data);
    return response.data;
  },

  async markAsRead(id: number): Promise<void> {
    await api.post<ApiResponse<void>>(`/messages/${id}/read`);
  },

  async deleteMessage(id: number): Promise<void> {
    await api.delete<ApiResponse<void>>(`/messages/${id}`);
  },

  async getUnreadCount(): Promise<number> {
    const response = await api.get<ApiResponse<{ count: number }>>('/messages/unread-count');
    return response.data.count;
  },

  async uploadAttachment(messageId: number, file: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);
    await api.upload<ApiResponse<void>>(`/messages/${messageId}/attachments`, formData);
  }
};