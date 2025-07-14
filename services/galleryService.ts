import { api } from '@/lib/api';
import { 
  GalleryAlbum, 
  CreateGalleryAlbumRequest,
  SearchFilter,
  PagedResult,
  ApiResponse 
} from '@/types/api';

export const galleryService = {
  async getAlbums(filter?: SearchFilter): Promise<PagedResult<GalleryAlbum>> {
    const response = await api.get<ApiResponse<PagedResult<GalleryAlbum>>>('/gallery/albums', filter);
    return response.data;
  },

  async getAlbum(id: number): Promise<GalleryAlbum> {
    const response = await api.get<ApiResponse<GalleryAlbum>>(`/gallery/albums/${id}`);
    return response.data;
  },

  async createAlbum(data: CreateGalleryAlbumRequest): Promise<GalleryAlbum> {
    const response = await api.post<ApiResponse<GalleryAlbum>>('/gallery/albums', data);
    return response.data;
  },

  async updateAlbum(id: number, data: Partial<CreateGalleryAlbumRequest>): Promise<GalleryAlbum> {
    const response = await api.put<ApiResponse<GalleryAlbum>>(`/gallery/albums/${id}`, data);
    return response.data;
  },

  async deleteAlbum(id: number): Promise<void> {
    await api.delete<ApiResponse<void>>(`/gallery/albums/${id}`);
  },

  async uploadImages(albumId: number, files: File[]): Promise<void> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });
    await api.upload<ApiResponse<void>>(`/gallery/albums/${albumId}/images`, formData);
  },

  async deleteImage(albumId: number, imageId: number): Promise<void> {
    await api.delete<ApiResponse<void>>(`/gallery/albums/${albumId}/images/${imageId}`);
  },

  async likeAlbum(id: number): Promise<void> {
    await api.post<ApiResponse<void>>(`/gallery/albums/${id}/like`);
  },

  async unlikeAlbum(id: number): Promise<void> {
    await api.delete<ApiResponse<void>>(`/gallery/albums/${id}/like`);
  },

  async incrementViews(id: number): Promise<void> {
    await api.post<ApiResponse<void>>(`/gallery/albums/${id}/view`);
  }
};