import { getVideoIdAndProvider } from './getVideoIdAndProvider';
import { getVimeoData } from './vimeo';

import { VideoRequestData } from '../interfaces/video-request-data';
import { VideoData } from '../interfaces/video-data';
import { VimeoResponse } from '../interfaces/responses/vimeo-video.response';

export const getVideoData = async (
  urlOrId: string
): Promise<VideoData | null> => {
  const videoIdAndProvider: VideoRequestData | null = getVideoIdAndProvider(urlOrId);
  if (!!!videoIdAndProvider) return null;


    if(videoIdAndProvider.provider === 'vimeo') {

    } else if(videoIdAndProvider.provider === 'youtube') {

    }

  return null;
};
