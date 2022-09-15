import { VimeoResponse } from '../interfaces/responses/vimeo-video.response';
import { VIMEO_TOKEN } from '../api-keys';

export const getVimeoData = async (videoId: string): Promise<VimeoResponse> => {
  const query: string = `https://api.vimeo.com/videos/${videoId}`;

  return await fetch(query, {
    headers: {
      Authorization: `Bearer ${VIMEO_TOKEN}`,
    },
  })
    .then((response: Response) => response.json())
    .then((res: VimeoResponse) => {
      return res;
    });
};
