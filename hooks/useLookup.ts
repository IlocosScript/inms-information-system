import { useState, useEffect } from 'react';
import { lookupService } from '@/services/lookupService';
import { Specialty, Hospital } from '@/types/api';
import { useMutation } from './useApi';

export function useSpecialties() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        setLoading(true);
        const response = await lookupService.getSpecialties(1, 100); // Get all specialties
        setSpecialties(response.items);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch specialties');
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  return { specialties, loading, error };
}

export function useHospitals() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const response = await lookupService.getHospitals(1, 100); // Get all hospitals
        setHospitals(response.items);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch hospitals');
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return { hospitals, loading, error };
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