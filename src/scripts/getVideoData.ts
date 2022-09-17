import { getVideoIdAndProvider } from './getVideoIdAndProvider';
import { getVimeoData, getVimeoDataRXJS } from './vimeo';
import { getYoutubeData, getYoutubeDataRXJS } from './youtube';

import { VideoRequestData } from '../interfaces/video-request-data';
import { VideoData } from '../interfaces/video-data';

export const getVideoData = (urlOrId: string): VideoData | null => {
  const videoIdAndProvider: VideoRequestData | null =
    getVideoIdAndProvider(urlOrId);
  if (!!!videoIdAndProvider) return null;

  let videoData: VideoData = {
    name: '',
    likes: '',
    viewCount: '',
    url: '',
    thumbnail: {
      url: '',
      width: 0,
      height: 0,
    },
  };

  if (videoIdAndProvider.provider === 'vimeo') {
    getVimeoDataRXJS(videoIdAndProvider.id).subscribe((res) => {
      videoData.name = res.response.name;
      videoData.likes =
        res.response.metadata.connections.likes.total.toString();
      videoData.viewCount = res.response.stats.plays.toString();
      videoData.url = res.response.link;
      videoData.thumbnail.url = res.response.pictures.sizes[2].link;
      videoData.thumbnail.width =
        res.response.pictures.sizes[2].width;
      videoData.thumbnail.height =
        res.response.pictures.sizes[2].height;
    });
    // console.log(getVimeoData(videoIdAndProvider.id));
    return videoData;
  } else if (videoIdAndProvider.provider === 'youtube') {
    getYoutubeDataRXJS(videoIdAndProvider.id).subscribe((res) => {
      videoData.name = res.response.items[0].snippet.title;
      videoData.likes = res.response.items[0].statistics.likeCount;
      videoData.viewCount =
        res.response.items[0].statistics.viewCount;
      videoData.url = `www.youtube.com/watch?v=${res.response.items[0].id}`;
      videoData.thumbnail.url =
        res.response.items[0].snippet.thumbnails.medium.url;
      videoData.thumbnail.width =
        res.response.items[0].snippet.thumbnails.medium.width;
      videoData.thumbnail.height =
        res.response.items[0].snippet.thumbnails.medium.height;
    });
    return videoData;
  }

  return null;
};
