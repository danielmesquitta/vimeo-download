import { Context } from 'koa';

import { downloadFromVimeo } from '~/services';

class DownloadsController {
  public async create(ctx: Context): Promise<void> {
    const { url } = ctx.request.body as Record<string, any>;

    console.log(url);

    const response = await downloadFromVimeo.execute({
      url,
    });

    ctx.body = response;
  }
}

export default new DownloadsController();
