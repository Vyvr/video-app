import { FC } from 'react';

import './videoGrid.css';

interface VideoGridProps {
  children: React.ReactNode;
}

const VideoGrid: FC<VideoGridProps> = (props) => {
  return <div id="video-container"></div>;
};

export default VideoGrid;
