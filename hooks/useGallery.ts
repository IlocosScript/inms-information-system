import { useApi, useMutation } from './useApi';
import { galleryService } from '@/services/galleryService';
import { GalleryAlbum, CreateGalleryAlbumRequest, SearchFilter } from '@/types/api';

export function useGalleryAlbums(filter?: SearchFilter) {
  return useApi(() => galleryService.getAlbums(filter));
}

export function useGalleryAlbum(id: number) {
  return useApi(() => galleryService.getAlbum(id));
}

export function useCreateGalleryAlbum() {
  return useMutation((data: CreateGalleryAlbumRequest) => 
    galleryService.createAlbum(data)
  );
}

export function useUpdateGalleryAlbum() {
  return useMutation(({ id, data }: { id: number; data: Partial<CreateGalleryAlbumRequest> }) => 
    galleryService.updateAlbum(id, data)
  );
}

export function useDeleteGalleryAlbum() {
  return useMutation((id: number) => galleryService.deleteAlbum(id));
}

export function useUploadImages() {
  return useMutation(({ albumId, files }: { albumId: number; files: File[] }) => 
    galleryService.uploadImages(albumId, files)
  );
}

export function useDeleteImage() {
  return useMutation(({ albumId, imageId }: { albumId: number; imageId: number }) => 
    galleryService.deleteImage(albumId, imageId)
  );
}

export function useLikeAlbum() {
  return useMutation((id: number) => galleryService.likeAlbum(id));
}

export function useUnlikeAlbum() {
  return useMutation((id: number) => galleryService.unlikeAlbum(id));
}