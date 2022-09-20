import { getVideoIdAndProvider } from './getVideoIdAndProvider';
import { getVimeoData } from './vimeo';
import { getYoutubeData } from './youtube';

import { VideoRequestData } from '../interfaces/video-request-data';
import { VideoData } from '../interfaces/video-data';

export const getVideoData = async (
  urlOrId: string
): Promise<VideoData | null> => {
  const videoIdAndProvider: VideoRequestData | null =
    getVideoIdAndProvider(urlOrId);

  if (!!!videoIdAndProvider) return null;

  if (videoIdAndProvider.provider === 'vimeo') {
    return await getVimeoData(videoIdAndProvider.id);
  } else if (videoIdAndProvider.provider === 'youtube') {
    return await getYoutubeData(videoIdAndProvider.id);
  }

  return null;
};
