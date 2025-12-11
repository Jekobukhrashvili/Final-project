import axios from "axios";
import type { UnsplashPhoto } from "../types/unsplash";

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY as string;
if (!ACCESS_KEY) console.warn("VITE_UNSPLASH_ACCESS_KEY not set");

export const PER_PAGE = 20;

const api = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  timeout: 15000,
});

export async function fetchPhotos({
  page = 1,
}: {
  page?: number;
}): Promise<UnsplashPhoto[]> {
  const resp = await api.get<UnsplashPhoto[]>("/photos", {
    params: { page, per_page: PER_PAGE },
  });
  return resp.data;
}

export async function searchPhotos({
  query,
  page = 1,
}: {
  query: string;
  page?: number;
}): Promise<{ results: UnsplashPhoto[]; total: number; total_pages: number }> {
  const resp = await api.get("/search/photos", {
    params: { query, page, per_page: PER_PAGE },
  });
  return resp.data;
}

export async function fetchPhotoById(id: string): Promise<UnsplashPhoto> {
  const resp = await api.get<UnsplashPhoto>(`/photos/${id}`);
  return resp.data;
}
