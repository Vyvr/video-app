import { FC, useState, ChangeEvent, useEffect } from 'react';
import { Button, Input } from 'reactstrap';
import Header from './components/header/header';
import VideoGrid from './components/videoGrid/videoGrid';

import { VideoData } from './interfaces/video-data';

import { getVideoData } from './scripts/getVideoData';

import { exampleVideos } from './example-videos';

import './App.css';
import { loadExampleData } from './scripts/loadExampleData';
import {
  getYoutubeData,
  getYoutubeDataRXJS,
} from './scripts/youtube';
import { getVimeoData, getVimeoDataRXJS } from './scripts/vimeo';

const App: FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [data, setData] = useState<VideoData[]>([]);
  const [addVideoTrigger, setAddVideoTrigger] =
    useState<boolean>(false);

  useEffect(() => {
    for (const key in localStorage) {
      const item: string | null = localStorage.getItem(key);
      if (item) {
        const itemObj: VideoData = JSON.parse(item);
        if (data.includes(itemObj))
          setData((data) => [...data, itemObj]);
      }
    }
  }, [addVideoTrigger]);

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value);
  };

  const addNewVideo = async () => {
    await getVideoData(videoUrl).then((d) => {
      if (!!d) {
        setData((data) => [...data, d]);
        localStorage.setItem(d.id, JSON.stringify(d));
      }
    });
    setAddVideoTrigger(!addVideoTrigger);
  };

  const loadDefaultData = async () => {
    setData(await loadExampleData());
  };

  const showData = () => {
    // for (const key in localStorage) {
    //   const item: string | null = localStorage.getItem(key);
    //   if (item) console.log(JSON.parse(item));
    // }
    // console.log(JSON.parse({...localStorage}));
    console.log(data);
  };

  return (
    <div className="App">
      <Header>
        <div>
          <Input
            type="text"
            placeholder="enter your video URL"
            onChange={handleUrlChange}
          />
        </div>
        <Button color="primary" onClick={() => addNewVideo()}>
          Add new video
        </Button>
        <Button color="primary" onClick={() => loadDefaultData()}>
          Load default data
        </Button>
        <Button color="danger" onClick={() => showData()}>
          Show data
        </Button>
      </Header>

      {/* <VideoGrid></VideoGrid> */}
    </div>
  );
};

export default App;
