import { useApi, useMutation } from './useApi';
import { eventService } from '@/services/eventService';
import { Event, CreateEventRequest, UpdateEventRequest, CreateEventRegistrationRequest, SearchFilter } from '@/types/api';

export function useEvents(filter?: SearchFilter) {
  return useApi(() => eventService.getEvents(filter));
}

export function useEvent(id: number) {
  return useApi(() => eventService.getEvent(id));
}

export function useCreateEvent() {
  return useMutation((data: CreateEventRequest) => eventService.createEvent(data));
}

export function useUpdateEvent() {
  return useMutation(({ id, data }: { id: number; data: UpdateEventRequest }) => 
    eventService.updateEvent(id, data)
  );
}

export function useDeleteEvent() {
  return useMutation((id: number) => eventService.deleteEvent(id));
}

export function useRegisterForEvent() {
  return useMutation((data: CreateEventRegistrationRequest) => 
    eventService.registerForEvent(data)
  );
}

export function useCancelRegistration() {
  return useMutation((eventId: number) => eventService.cancelRegistration(eventId));
}

export function useMyRegistrations() {
  return useApi(() => eventService.getMyRegistrations());
}

export function useUpcomingEvents() {
  return useApi(() => eventService.getUpcomingEvents());
}