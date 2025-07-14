import { useApi, useMutation } from './useApi';
import { cmeService } from '@/services/cmeService';
import { CMEPoint, CreateCMEPointRequest, CreateCOGSRequestRequest, SearchFilter } from '@/types/api';

export function useCMEPoints(filter?: SearchFilter) {
  return useApi(() => cmeService.getCMEPoints(filter));
}

export function useMyCMEPoints(year?: number) {
  return useApi(() => cmeService.getMyCMEPoints(year));
}

export function useCreateCMEPoint() {
  return useMutation((data: CreateCMEPointRequest) => cmeService.createCMEPoint(data));
}

export function useUpdateCMEPoint() {
  return useMutation(({ id, data }: { id: number; data: Partial<CreateCMEPointRequest> }) => 
    cmeService.updateCMEPoint(id, data)
  );
}

export function useDeleteCMEPoint() {
  return useMutation((id: number) => cmeService.deleteCMEPoint(id));
}

export function useMyTotalPoints(year: number) {
  return useApi(() => cmeService.getMyTotalPoints(year));
}

export function useCOGSRequests(filter?: SearchFilter) {
  return useApi(() => cmeService.getCOGSRequests(filter));
}

export function useCreateCOGSRequest() {
  return useMutation((data: CreateCOGSRequestRequest) => cmeService.createCOGSRequest(data));
}

export function useApproveCMEPoint() {
  return useMutation((id: number) => cmeService.approveCMEPoint(id));
}

export function useRejectCMEPoint() {
  return useMutation(({ id, reason }: { id: number; reason: string }) => 
    cmeService.rejectCMEPoint(id, reason)
  );
}