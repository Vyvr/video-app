import { VimeoResponse } from '../interfaces/responses/vimeo-video.response';
import { VideoData } from '../interfaces/video-data';
import { VIMEO_TOKEN } from '../api-keys';
import { ajax } from 'rxjs/ajax';

export const getVimeoDataRXJS = (videoId: string) => {
  const request: string = `https://api.vimeo.com/videos/${videoId}`;

  const authHeaders = {
    Authorization: `Bearer ${VIMEO_TOKEN}`,
  };

  return ajax<VimeoResponse>({
    method: 'GET',
    url: request,
    responseType: 'json',
    headers: authHeaders,
    crossDomain: true,
  });
};

export const getVimeoData = async (videoId: string): Promise<VideoData | null> => {
  const request: string = `https://api.vimeo.com/videos/${videoId}`;

  return await fetch(request, {
    headers: {
      Authorization: `Bearer ${VIMEO_TOKEN}`,
    },
  })
    .then((response: Response) => response.json())
    .then((res: VimeoResponse) => {
      if (!!res) {
        return {
          id: videoId,
          name: res.name,
          likes: res.metadata.connections.likes.total.toString(),
          viewCount: res.stats.plays.toString(),
          url: res.link,
          thumbnail: {
            url: res.pictures.sizes[2].link,
            width: res.pictures.sizes[2].width,
            height: res.pictures.sizes[2].height,
          },
        };
      }
      return null;
    });
};
