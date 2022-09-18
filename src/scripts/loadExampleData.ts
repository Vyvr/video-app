import { parse } from 'path';
import { exampleVideos } from '../example-videos';
import { VideoData } from '../interfaces/video-data';
import { getVideoData } from './getVideoData';

export const loadExampleData = async (): Promise<VideoData[]> => {
  const videos: VideoData[] = [];
  exampleVideos.forEach((v) => {
    getVideoData(v).then(v => {
      if(!!v) {
      videos.push(v);
      localStorage.setItem(v.id, JSON.stringify(v));
    }
    });
  });

  return videos;
};
