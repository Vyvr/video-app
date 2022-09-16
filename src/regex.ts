export const vimeoUrlRegex =
  '^(http|https)?:\\/\\/(www\\.)?vimeo.com\\/(?:channels\\/(?:\\w+\\/)?|groups\\/([^\\/]*)\\/videos\\/|)(\\d+)(?:|\\/\\?)$';

export const vimeoIdRegex = '^(\\d+)$';

export const youtubeUrlRegex =
  '^((?:https?:)?\\/\\/)?((?:www|m)\\.)?((?:youtube(-nocookie)?\\.com|youtu.be))(\\/(?:[\\w\\-]+\\?v=|embed\\/|v\\/)?)([\\w\\-]+)(\\S+)?$';

export const youtubeIdRegex = '^([\\w\\-]+)$';
