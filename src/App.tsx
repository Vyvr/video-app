import {
  FC,
  useState,
  ChangeEvent,
  useEffect,
  useReducer,
} from 'react';
import {
  Button,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import Header from './components/header/header';
import VideoGrid from './components/videoGrid/videoGrid';
import GridChild from './components/videoGrid/gridChild';
import { VideoData } from './interfaces/video-data';
import { getVideoData } from './scripts/getVideoData';
import { loadExampleData } from './scripts/loadExampleData';
import './App.css';
import _ from 'lodash';

const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [data, setData] = useState<VideoData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(9);

  useEffect(() => {
    for (const key in localStorage) {
      const item: string | null = localStorage.getItem(key);
      if (!!!item) return;
      const itemObj: VideoData = JSON.parse(item);
      setData((data) => [...data, itemObj]);
    }
  }, []);

  const loadDefaultData = async () => {
    setIsLoading(true);
    const exampleData: VideoData[] = await loadExampleData();
    setData(exampleData);
    setIsLoading(false);
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value);
  };

  const addNewVideo = async () => {
    setIsLoading(true);
    await getVideoData(videoUrl).then((d) => {
      if (!!!d) return;
      const dataFromStorage: string | null = localStorage.getItem(
        d.id
      );
      if (!!dataFromStorage) return;
      setData((data) => [...data, d]);
      localStorage.setItem(d.id, JSON.stringify(d));
    });
    setIsLoading(false);
  };

  const showData = () => {
    console.log(data);
  };

  const handleFavouriteChange = (id: string): void => {
    const videoData: string | null = localStorage.getItem(id);
    if (!!videoData) {
      const videoDataObj: VideoData = JSON.parse(videoData);
      videoDataObj.favourite = !videoDataObj.favourite;

      localStorage.setItem(id, JSON.stringify(videoDataObj));

      setData((current) =>
        current.map((item) => {
          if (item.id === id) {
            return { ...item, favourite: !item.favourite };
          }
          return item;
        })
      );
    }
  };

  const handleDeleteVideo = (id: string): void => {
    const videoData: string | null = localStorage.getItem(id);
    if (!!videoData) {
      localStorage.removeItem(id);

      setData(data.filter((item) => item.id !== id));
    }
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
          onClick={() => addNewVideo()}
          disabled={isLoading}
        >
          Add new video
        </Button>
        <Button
          color="primary"
          onClick={async () => await loadDefaultData()}
          disabled={isLoading}
        >
          Load default data
        </Button>
        <Button color="danger" onClick={() => showData()}>
          Show data
        </Button>
      </Header>
      {isLoading ? (
        <div
          className="spinner-border text-light"
          style={{ marginTop: '10px', marginBottom: '10px' }}
        >
          <span className="sr-only"></span>
        </div>
      ) : null}
      <VideoGrid>
        {data &&
          data.map((d) => {
            return (
              <GridChild
                key={d.id}
                title={d.name}
                viewCount={d.viewCount}
                likeCount={d.likes}
                addDate={d.addDate}
                favourite={d.favourite}
                thumbnailId={d.id}
                thumbnailUrl={d.thumbnail.url}
                changeFavourite={handleFavouriteChange}
                deleteVideo={handleDeleteVideo}
              />
            );
          })}
      </VideoGrid>

      <Pagination>
        <PaginationItem>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default App;
