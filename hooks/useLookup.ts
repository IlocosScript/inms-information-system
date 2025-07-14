import { useApi, useMutation } from './useApi';
import { lookupService } from '@/services/lookupService';
import { Specialty, Hospital } from '@/types/api';

export function useSpecialties() {
  return useApi(() => lookupService.getSpecialties());
}

export function useHospitals() {
  return useApi(() => lookupService.getHospitals());
}

export function useCreateSpecialty() {
  return useMutation((data: { name: string; description?: string }) => 
    lookupService.createSpecialty(data)
  );
}

export function useUpdateSpecialty() {
  return useMutation(({ id, data }: { 
    id: number; 
    data: { name?: string; description?: string; isActive?: boolean } 
  }) => lookupService.updateSpecialty(id, data));
}

export function useCreateHospital() {
  return useMutation((data: { 
    name: string; 
    address?: string; 
    phone?: string; 
    email?: string; 
    website?: string; 
  }) => lookupService.createHospital(data));
}

export function useUpdateHospital() {
  return useMutation(({ id, data }: { 
    id: number; 
    data: { 
      name?: string; 
      address?: string; 
      phone?: string; 
      email?: string; 
      website?: string; 
      isActive?: boolean; 
    } 
  }) => lookupService.updateHospital(id, data));
}