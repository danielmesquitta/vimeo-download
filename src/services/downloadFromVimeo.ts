import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import VideoDownloader from '@leorossi/vimeo-downloader';
import { randomUUID } from 'crypto';
import ffmpeg from 'fluent-ffmpeg';
import { join } from 'path';

interface Request {
  url: string;
}

interface Response {
  videoFile: string;
  audioFile: string;
}

class DownloadFromVimeo {
  public async execute({ url }: Request): Promise<Response> {
    const videoDownloader = new VideoDownloader({
      referer: 'http://localhost:3333',
    });

    const fileName = randomUUID();

    const tmpDirPath = join(__dirname, '../../tmp');

    await videoDownloader.download(url, fileName, tmpDirPath);

    const videoFile = join(tmpDirPath, `${fileName}.mp4`);

    ffmpeg.setFfmpegPath(ffmpegPath);

    const audioFile = join(tmpDirPath, `${fileName}.mp3`);

    await new Promise<void>((resolve, reject) => {
      ffmpeg(videoFile)
        .toFormat('mp3')
        .on('end', () => resolve())
        .on('error', (err: Error) => reject(err))
        .saveToFile(audioFile);
    });

    return {
      videoFile,
      audioFile,
    };
  }
}

export default new DownloadFromVimeo();
