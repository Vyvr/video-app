import { FC, useState, ChangeEvent, useEffect } from 'react';
import { Button, Input } from 'reactstrap';
import Header from './components/header/header';

import { VideoData } from './interfaces/video-data';

import { getVideoData } from './scripts/getVideoData';

import './App.css';


const App: FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoData, setVideoData] = useState<VideoData>();
  const [imgUrl, setImgUrl] = useState<string>('');
  const [searchVideoDataTrigger, setSearchVideoDataTrigger] = useState<boolean>(false);


  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value);
  };

  const searchVideoData = async (): Promise<void> => {
    const data = getVideoData(videoUrl);
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
        <Button
          color="primary"
          onClick={() =>
            // setSearchVideoDataTrigger(!searchVideoDataTrigger)
            searchVideoData()
          }
        >
          Search for video
        </Button>
      </Header>

      <img alt="" src={`${imgUrl}`} />
    </div>
  );
};

export default App;
