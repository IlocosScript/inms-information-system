import { api } from '@/lib/api';
import { 
  Announcement, 
  CreateAnnouncementRequest, 
  UpdateAnnouncementRequest,
  AnnouncementResponseRequest,
  SearchFilter,
  PagedResult,
  ApiResponse 
} from '@/types/api';

export const announcementService = {
  async getAnnouncements(filter?: SearchFilter): Promise<PagedResult<Announcement>> {
    const response = await api.get<ApiResponse<PagedResult<Announcement>>>('/announcements', filter);
    return response.data;
  },

  async getAnnouncement(id: number): Promise<Announcement> {
    const response = await api.get<ApiResponse<Announcement>>(`/announcements/${id}`);
    return response.data;
  },

  async createAnnouncement(data: CreateAnnouncementRequest): Promise<Announcement> {
    const response = await api.post<ApiResponse<Announcement>>('/announcements', data);
    return response.data;
  },

  async updateAnnouncement(id: number, data: UpdateAnnouncementRequest): Promise<Announcement> {
    const response = await api.put<ApiResponse<Announcement>>(`/announcements/${id}`, data);
    return response.data;
  },

  async deleteAnnouncement(id: number): Promise<void> {
    await api.delete<ApiResponse<void>>(`/announcements/${id}`);
  },

  async respondToAnnouncement(data: AnnouncementResponseRequest): Promise<void> {
    await api.post<ApiResponse<void>>('/announcements/respond', data);
  },

  async markAsRead(id: number): Promise<void> {
    await api.post<ApiResponse<void>>(`/announcements/${id}/read`);
  },

  async bookmarkAnnouncement(id: number): Promise<void> {
    await api.post<ApiResponse<void>>(`/announcements/${id}/bookmark`);
  },

  async unbookmarkAnnouncement(id: number): Promise<void> {
    await api.delete<ApiResponse<void>>(`/announcements/${id}/bookmark`);
  },

  async getMyBookmarks(): Promise<Announcement[]> {
    const response = await api.get<ApiResponse<Announcement[]>>('/announcements/bookmarks');
    return response.data;
  },

  async uploadAttachment(announcementId: number, file: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);
    await api.upload<ApiResponse<void>>(`/announcements/${announcementId}/attachments`, formData);
  }
};