export interface UnsplashUser {
  id: string;
  username: string;
  name: string;
  links: { html: string };
}

export interface UnsplashUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface UnsplashPhoto {
  id: string;
  created_at: string;
  width: number;
  height: number;
  color: string | null;
  blur_hash?: string;
  likes: number;
  description?: string | null;
  alt_description?: string | null;
  urls: UnsplashUrls;
  user: UnsplashUser;
  links: { html: string };
}
