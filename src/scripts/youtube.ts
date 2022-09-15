import { YouTubeResponse } from '../interfaces/responses/youtube-video.response';
import { YOUTUBE_API_KEY } from '../api-keys';

export const getYoutubeData = async (videoId: string): Promise<YouTubeResponse> => {
  const query: string = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`;
  
  return await fetch(query)
    .then((response: Response) => response.json())
    .then((res: YouTubeResponse) => {return res;});
};
