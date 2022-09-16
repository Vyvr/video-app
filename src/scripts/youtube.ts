import { YouTubeResponse } from '../interfaces/responses/youtube-video.response';
import { VideoData } from '../interfaces/video-data';

import { YOUTUBE_API_KEY } from '../api-keys';

export const getYoutubeData = async (videoId: string): Promise<VideoData | null> => {
  const query: string = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`;

  return await fetch(query)
    .then((response: Response) => response.json())
    .then((res: YouTubeResponse) => {
      if(!!res) {
        console.log(res);
      return {
        name: res.items[0].snippet.title,
        likes: res.items[0].statistics.likeCount.toString(),
        viewCount: res.items[0].statistics.viewCount,
        thumbnail: {
          url: res.items[0].snippet.thumbnails.medium.url,
          width: res.items[0].snippet.thumbnails.medium.width,
          height: res.items[0].snippet.thumbnails.medium.height,
        },
      };}
      return null;
    });
};
