import { useApi, useMutation } from './useApi';
import { specialtyService, CreateSpecialtyRequest, UpdateSpecialtyRequest } from '@/services/specialtyService';
import { SearchFilter } from '@/types/api';

export function useSpecialties(filter?: SearchFilter) {
  return useApi(() => specialtyService.getSpecialties(filter));
}

export function useSpecialty(id: number) {
  return useApi(() => specialtyService.getSpecialty(id));
}

export function useCreateSpecialty() {
  return useMutation((data: CreateSpecialtyRequest) => 
    specialtyService.createSpecialty(data)
  );
}

export function useUpdateSpecialty() {
  return useMutation(({ id, data }: { 
    id: number; 
    data: UpdateSpecialtyRequest 
  }) => specialtyService.updateSpecialty(id, data));
}

export function useDeleteSpecialty() {
  return useMutation((id: number) => specialtyService.deleteSpecialty(id));
}

export function useToggleSpecialtyStatus() {
  return useMutation(({ id, isActive }: { id: number; isActive: boolean }) => 
    specialtyService.toggleSpecialtyStatus(id, isActive)
  );
} 