import { useApi, useMutation } from './useApi';
import { announcementService } from '@/services/announcementService';
import { Announcement, CreateAnnouncementRequest, UpdateAnnouncementRequest, AnnouncementResponseRequest, SearchFilter } from '@/types/api';

export function useAnnouncements(filter?: SearchFilter) {
  return useApi(() => announcementService.getAnnouncements(filter));
}

export function useAnnouncement(id: number) {
  return useApi(() => announcementService.getAnnouncement(id));
}

export function useCreateAnnouncement() {
  return useMutation((data: CreateAnnouncementRequest) => 
    announcementService.createAnnouncement(data)
  );
}

export function useUpdateAnnouncement() {
  return useMutation(({ id, data }: { id: number; data: UpdateAnnouncementRequest }) => 
    announcementService.updateAnnouncement(id, data)
  );
}

export function useDeleteAnnouncement() {
  return useMutation((id: number) => announcementService.deleteAnnouncement(id));
}

export function useRespondToAnnouncement() {
  return useMutation((data: AnnouncementResponseRequest) => 
    announcementService.respondToAnnouncement(data)
  );
}

export function useMarkAnnouncementAsRead() {
  return useMutation((id: number) => announcementService.markAsRead(id));
}

export function useBookmarkAnnouncement() {
  return useMutation((id: number) => announcementService.bookmarkAnnouncement(id));
}

export function useUnbookmarkAnnouncement() {
  return useMutation((id: number) => announcementService.unbookmarkAnnouncement(id));
}