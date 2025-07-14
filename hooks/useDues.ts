import { useApi, useMutation } from './useApi';
import { duesService } from '@/services/duesService';
import { MembershipDue, SearchFilter } from '@/types/api';

export function useMyDues(year?: number) {
  return useApi(() => duesService.getMyDues(year));
}

export function useAllDues(filter?: SearchFilter) {
  return useApi(() => duesService.getAllDues(filter));
}

export function useCreateDue() {
  return useMutation((data: {
    memberId: number;
    dueType: number;
    description: string;
    amount: number;
    year: number;
    dueDate: string;
  }) => duesService.createDue(data));
}

export function usePayDue() {
  return useMutation(({ dueId, paymentData }: {
    dueId: number;
    paymentData: {
      paymentMethod: string;
      paymentReference: string;
    };
  }) => duesService.payDue(dueId, paymentData));
}

export function useMyPayments() {
  return useApi(() => duesService.getMyPayments());
}

export function useAllPayments(filter?: SearchFilter) {
  return useApi(() => duesService.getAllPayments(filter));
}

export function useDownloadReceipt() {
  return useMutation((paymentId: number) => duesService.downloadReceipt(paymentId));
}