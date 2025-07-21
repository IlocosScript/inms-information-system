import { useApi, useMutation } from './useApi';
import { memberService } from '@/services/memberService';
import { CreateMemberRequest, UpdateMemberRequest, SearchFilter } from '@/types/api';

export function useMembers(filter?: SearchFilter) {
  return useApi(() => memberService.getMembers(filter));
}

export function useMember(id: number) {
  return useApi(() => memberService.getMember(id));
}

export function useCreateMember() {
  return useMutation((data: CreateMemberRequest) => 
    memberService.createMember(data)
  );
}

export function useUpdateMember() {
  return useMutation(({ id, data }: { 
    id: number; 
    data: UpdateMemberRequest 
  }) => memberService.updateMember(id, data));
}

export function useDeleteMember() {
  return useMutation((id: number) => memberService.deleteMember(id));
}

export function useUploadProfileImage() {
  return useMutation(({ id, file }: { id: number; file: File }) => 
    memberService.uploadProfileImage(id, file)
  );
}

export function useMembersBySpecialty() {
  return useMutation((specialtyId: number) => 
    memberService.getMembersBySpecialty(specialtyId)
  );
}

export function useMembersByHospital() {
  return useMutation((hospitalId: number) => 
    memberService.getMembersByHospital(hospitalId)
  );
}

export function useActiveMembers() {
  return useApi(() => memberService.getActiveMembers());
}