export interface VideoData {
  name: string;
  likes: string;
  viewCount: string;
  thumbnail: Thumbnail;
  addDate?: Date;
  url: string;
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
