import express from 'express';
import { lineController } from '../controllers';
import { handleErrorAsync } from '../services/handleResponse';
import { type MiddlewareConfig } from '@line/bot-sdk';
import { config } from '../config';

const middlewareConfig: MiddlewareConfig = {
  channelSecret: config.LINE_CHANNEL_SECRET
};
console.log('middlewareConfig', middlewareConfig);
const router = express.Router();

router.post(
  '/webhook',
  // middleware(middlewareConfig),
  /**
   * #swagger.tags = ['Line']
   * #swagger.description = 'webhook 功能'
      #swagger.parameters['post'] = {
      in: 'body',
      description: 'webhook',
      required: true,
      schema: {
        $name: 'name',
        $nickname: 'nickname',
        $email: 'email',
        $gender: 'male'
      }
    }
  */
  handleErrorAsync(lineController.handleWebhook)
);

export default router;
