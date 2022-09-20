import { exampleVideos } from '../example-videos';
import { VideoData } from '../interfaces/video-data';
import { getVideoData } from './getVideoData';

export const loadExampleData = async (): Promise<VideoData[]> => {
  const videos: VideoData[] = [];

  for(const item of exampleVideos) { 
     const vid: VideoData | null =  await getVideoData(item)
     if(!!vid) {
      videos.push(vid);
      localStorage.setItem(vid.id, JSON.stringify(vid));
     }
  }

  return videos;
};
