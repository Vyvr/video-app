import { YouTubeResponse } from '../interfaces/responses/youtube-video.response';
import { VideoData } from '../interfaces/video-data';
import { ajax } from 'rxjs/ajax';

import { YOUTUBE_API_KEY } from '../api-keys';

export const getYoutubeDataRXJS = (videoId: string) => {
  const request: string = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`;

  // return ajax.get<YouTubeResponse>(request);

  return ajax.get<YouTubeResponse>(request)
};

export const getYoutubeData = async (videoId: string): Promise<VideoData | null> => {
  const request: string = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${YOUTUBE_API_KEY}`;

  return await fetch(request)
    .then((response: Response) => response.json())
    .then((res: YouTubeResponse) => {
      if (!!res) {
        return {
          id: videoId,
          name: res.items[0].snippet.title,
          likes: res.items[0].statistics.likeCount.toString(),
          viewCount: res.items[0].statistics.viewCount,
          url: `www.youtube.com/watch?v=${res.items[0].id}`,
          addDate: new Date(Date.now()).toLocaleDateString(),
          favourite: false,
          thumbnail: {
            url: res.items[0].snippet.thumbnails.medium.url,
            width: res.items[0].snippet.thumbnails.medium.width,
            height: res.items[0].snippet.thumbnails.medium.height,
          },
        };
      }
      return null;
    });
};
