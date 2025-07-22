import { api } from '@/lib/api';
import { 
  Event, 
  CreateEventRequest, 
  UpdateEventRequest,
  EventRegistration,
  CreateEventRegistrationRequest,
  SearchFilter,
  PagedResult,
  ApiResponse,
  Member
} from '@/types/api';

export const eventService = {
  async getEvents(filter?: SearchFilter): Promise<PagedResult<Event>> {
    const response = await api.get<ApiResponse<PagedResult<Event>>>('/events', filter);
    return response.data;
  },

  async getEvent(id: number): Promise<Event> {
    const response = await api.get<ApiResponse<Event>>(`/events/${id}`);
    return response.data;
  },

  async createEvent(data: CreateEventRequest): Promise<Event> {
    const response = await api.post<ApiResponse<Event>>('/events', data);
    return response.data;
  },

  async updateEvent(id: number, data: UpdateEventRequest): Promise<Event> {
    const response = await api.put<ApiResponse<Event>>(`/events/${id}`, data);
    return response.data;
  },

  async deleteEvent(id: number): Promise<void> {
    await api.delete<ApiResponse<void>>(`/events/${id}`);
  },

  async registerForEvent(data: CreateEventRegistrationRequest): Promise<EventRegistration> {
    const response = await api.post<ApiResponse<EventRegistration>>('/events/register', data);
    return response.data;
  },

  async cancelRegistration(eventId: number): Promise<void> {
    await api.delete<ApiResponse<void>>(`/events/${eventId}/register`);
  },

  async getMyRegistrations(): Promise<EventRegistration[]> {
    const response = await api.get<ApiResponse<EventRegistration[]>>('/events/my-registrations');
    return response.data;
  },

  async getEventRegistrations(eventId: number): Promise<EventRegistration[]> {
    const response = await api.get<ApiResponse<EventRegistration[]>>(`/events/${eventId}/registrations`);
    return response.data;
  },

  async markAttendance(registrationId: number): Promise<void> {
    await api.post<ApiResponse<void>>(`/events/registrations/${registrationId}/mark-attendance`);
  },

  async getUpcomingEvents(): Promise<Event[]> {
    const response = await api.get<ApiResponse<Event[]>>('/events/upcoming');
    return response.data;
  },

  async uploadEventAttachment(eventId: number, file: File, description?: string): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);
    if (description) formData.append('description', description);
    await api.upload<ApiResponse<void>>(`/events/${eventId}/attachments`, formData);
  },

  async markBulkAttendance(registrationIds: number[]): Promise<void> {
    await api.post<ApiResponse<void>>('/events/registrations/bulk-attendance', { registrationIds });
  },

  async getEventAttendanceStats(eventId: number): Promise<{
    totalRegistered: number;
    totalAttended: number;
    attendanceRate: number;
  }> {
    const response = await api.get<ApiResponse<any>>(`/events/${eventId}/attendance-stats`);
    return response.data;
  },

  async getMemberByQRCode(qrCode: string, eventId: number): Promise<{
    member: Member;
    registration: EventRegistration;
  }> {
    const response = await api.get<ApiResponse<any>>(`/events/${eventId}/member-by-qr/${qrCode}`);
    return response.data;
  },

  async exportAttendanceReport(eventId: number): Promise<Blob> {
    const response = await api.get<Blob>(`/events/${eventId}/attendance-report`, { responseType: 'blob' });
    return response as Blob;
  }
};