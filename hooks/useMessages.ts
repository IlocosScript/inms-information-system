import { useApi, useMutation } from './useApi';
import { messageService } from '@/services/messageService';
import { Message, CreateMessageRequest, SearchFilter } from '@/types/api';

export function useMessages(filter?: SearchFilter) {
  return useApi(() => messageService.getMessages(filter));
}

export function useConversations() {
  return useApi(() => messageService.getConversations());
}

export function useConversation(memberId: number) {
  return useApi(() => messageService.getConversation(memberId));
}

export function useSendMessage() {
  return useMutation((data: CreateMessageRequest) => messageService.sendMessage(data));
}

export function useMarkMessageAsRead() {
  return useMutation((id: number) => messageService.markAsRead(id));
}

export function useDeleteMessage() {
  return useMutation((id: number) => messageService.deleteMessage(id));
}

export function useUnreadCount() {
  return useApi(() => messageService.getUnreadCount());
}