import VideoDownloader from '@leorossi/vimeo-downloader';
import { randomUUID } from 'crypto';
import { join } from 'path';

interface Request {
  url: string;
}

interface Response {
  file: string;
}

class DownloadFromVimeo {
  public async execute({ url }: Request): Promise<Response> {
    const videoDownloader = new VideoDownloader({
      referer: 'http://localhost:3333',
    });

    const fileName = `video-${randomUUID()}`;

    const dirPath = join(__dirname, '../../tmp');

    await videoDownloader.download(url, fileName, dirPath);

    const file = join(dirPath, `${fileName}.mp4`);

    return {
      file,
    };
  }
}

export default new DownloadFromVimeo();
