import Router from '@koa/router';

import { downloadsController } from '~/controllers';

import { isAuthenticated } from './middlewares';

const router = new Router();

router
  /**
   * Downloads
   */
  .post('/downloads', downloadsController.create)

  .use(isAuthenticated);

export default router;
