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
import { VideoProvider } from './interfaces/video-provider';

const App: FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoId, setVideoId] = useState<string>('');
  const [videoData, setVideoData] = useState<YouTubeResponse>();
  const [imgUrl, setImgUrl] = useState<string>('');
  const [searchYoutubeDataTrigger, setSearchYoutubeDataTrigger] =
    useState<boolean>(false);

  useEffect(() => {
    const regex = videoUrl.split(
      /(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/
    );
    setVideoId(
      regex[2] !== undefined
        ? regex[2].split(/[^0-9a-z_-]/i)[0]
        : regex[0]
    );
  }, [videoUrl]);

  useEffect(() => {
    const showVideoData = async (): Promise<void> => {
      const data: YouTubeResponse = await getYoutubeData(videoId);

      if (data !== undefined && data.items[0] !== undefined) {
        setVideoData(data);
        setImgUrl(data.items[0].snippet.thumbnails.medium.url);
      }
    };
    showVideoData();
  }, [searchYoutubeDataTrigger]);

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value);
  };

  const searchVimeoData = async (): Promise<void> => {
    const prov: VideoProvider | null = getVideoIdAndProvider(videoUrl);
    console.log(prov);

    // const a= videoUrl.match(/http:\/\/(:?www.)?(\w*)/)[2];
    // if (a =="youtube")
    //  {
    //         // do stuff
    //  }
    // else if (a =="vimeo")
    //  {
    //          // do stuff
    //  }
    //  else
    //  {
    //         // Not a valid url
    //  }

    // const regex = videoUrl.split(/vimeo.*?([0-9]+$)/gi);

    // setVideoId(regex[1] !== undefined ? regex[1] : regex[0]);
    // const data: VimeoResponse = await getVimeoData(regex[1]);

    // setImgUrl(data.pictures.sizes[2].link);
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
            setSearchYoutubeDataTrigger(!searchYoutubeDataTrigger)
          }
        >
          Search for video
        </Button>
      </Header>

      <div>
        <Input
          type="text"
          placeholder="enter your vimeo video URL"
          onChange={handleUrlChange}
        />
      </div>
      <Button color="primary" onClick={() => searchVimeoData()}>
        Search for video
      </Button>

      <img alt="" src={`${imgUrl}`} />
    </div>
  );
};

export default App;
