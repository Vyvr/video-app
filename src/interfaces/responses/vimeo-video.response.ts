export interface VimeoResponse {
  name: string;
  release_time: string;
  stats: Stats;
  metadata: Metadata;
  pictures: Pictures;
  link: string
}

interface Stats {
  plays: number;
}

interface Metadata {
  connections: Connections
}

interface Connections {
  likes: {
    total: number;
  };
}

interface Pictures {
  sizes: Size;
}

interface Size {
  [index: number]: {
    width: number;
    height: number;
    link: string;
  };
}
