import {
  vimeoUrlRegex,
  youtubeUrlRegex,
  vimeoIdRegex,
  youtubeIdRegex,
} from '../regex';
import { VideoProvider } from '../interfaces/video-provider';

export const getVideoIdAndProvider = (
  urlOrId: string
): VideoProvider | null => {
  const vimeoUrl = urlOrId.match(vimeoUrlRegex);
  if (!!vimeoUrl) {
    return { id: 'url', provider: 'vimeo' };
  }

  const youtubeUrl = urlOrId.match(youtubeUrlRegex);
  if (!!youtubeUrl) {
    return { id: 'url', provider: 'youtube' };
  }

  const vimeoId = urlOrId.match(vimeoIdRegex);
  if (!!vimeoId) {
    return { id: 'id', provider: 'vimeo' };
  }

  const youtubeId = urlOrId.match(youtubeIdRegex);
  if (!!youtubeId) {
    return { id: 'id', provider: 'youtube' };
  }

  return null;
};
