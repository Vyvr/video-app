import { FC, useState, ChangeEvent, useEffect } from 'react';
import { Button, Input } from 'reactstrap';
import Header from './components/header/header';

import { YouTubeResponse } from './interfaces/responses/youtube-video.response';
import { VimeoResponse } from './interfaces/responses/vimeo-video.response';

import { getYoutubeData } from './scripts/youtube';
import { getVimeoData } from './scripts/vimeo';

import './App.css';
import { isRegExp } from 'util/types';

import { getVideoIdAndProvider } from './scripts/getVideoIdAndProvider';
import { VideoRequestData } from './interfaces/video-request-data';
import { VideoData } from './interfaces/video-data';

const App: FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoId, setVideoId] = useState<string>('');
  const [videoData, setVideoData] = useState<VideoData>();
  const [imgUrl, setImgUrl] = useState<string>('');
  const [searchYoutubeDataTrigger, setSearchYoutubeDataTrigger] =
    useState<boolean>(false);

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value);
  };

  const searchVideoData = async (): Promise<void> => {};

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
            setSearchYoutubeDataTrigger(!searchYoutubeDataTrigger)
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
