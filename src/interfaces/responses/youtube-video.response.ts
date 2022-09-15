export interface YouTubeResponse {
  items: [
    {
      id: string;
      snippet: Snippet;
      statistics: Statistics;
    }
  ];
}

interface Snippet {
  channelId: string;
  channelTitle: string;
  description: string;
  publishedAt: string;
  title: string;
  thumbnails: Thumbnail;
}

interface Thumbnail {
  medium: {
    url: string;
    width: number;
    height: number;
  };
}

interface Statistics {
  commentCount: string;
  favoriteCount: string;
  likeCount: string;
  viewCount: string;
}
