import { VimeoResponse } from '../interfaces/responses/vimeo-video.response';
import { VideoData } from '../interfaces/video-data';
import { VIMEO_TOKEN } from '../api-keys';

export const getVimeoData = async (videoId: string): Promise<VideoData | null> => {
  const query: string = `https://api.vimeo.com/videos/${videoId}`;

  return await fetch(query, {
    headers: {
      Authorization: `Bearer ${VIMEO_TOKEN}`,
    },
  })
    .then((response: Response) => response.json())
    .then((res: VimeoResponse) => {
      if(!!res) {
     return {
        name: res.name,
        likes: res.connections.likes.total.toString(),
        viewCount: res.stats.plays.toString(),
        thumbnail: {
          url: res.pictures.sizes[2].link,
          width: res.pictures.sizes[2].width,
          height: res.pictures.sizes[2].height,
        }
      };}
      return null;
    });
};
