export interface VideoData {
  id: string;
  name: string;
  url: string;
  likes: string;
  viewCount: string;
  thumbnail: Thumbnail;
  addDate: string;
  favourite: boolean;
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
