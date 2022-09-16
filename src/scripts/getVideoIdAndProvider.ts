import {
  vimeoUrlRegex,
  youtubeUrlRegex,
  vimeoIdRegex,
  youtubeIdRegex,
} from '../regex';
import { VideoRequestData } from '../interfaces/video-request-data';

export const getVideoIdAndProvider = (urlOrId: string): VideoRequestData | null => {
  const vimeoUrl = urlOrId.match(vimeoUrlRegex);
  if (!!vimeoUrl) {
    return { id: vimeoUrl[4], provider: 'vimeo' };
  }

  const youtubeUrl = urlOrId.match(youtubeUrlRegex);
  if (!!youtubeUrl) {
    return { id: youtubeUrl[6], provider: 'youtube' };
  }

  const vimeoId = urlOrId.match(vimeoIdRegex);
  if (!!vimeoId) {
    return { id: urlOrId, provider: 'vimeo' };
  }

  const youtubeId = urlOrId.match(youtubeIdRegex);
  if (!!youtubeId) {
    return { id: urlOrId, provider: 'youtube' };
  }

  return null;
};
