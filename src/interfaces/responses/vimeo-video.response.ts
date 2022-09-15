export interface VimeoResponse {
  name: string;
  release_time: string;
  stats: Stats;
  connections: Connections;
  pictures: Pictures;
}

interface Stats {
  plays: number;
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
